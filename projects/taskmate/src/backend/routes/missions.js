const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const moment = require('moment');
const router = express.Router();

// MISSION-04: Mission System - Doesn't access device sensors, breaks goals into daily checkpoints
const dbPath = process.env.DB_PATH || path.join(__dirname, '../../taskmate.db');
const db = new sqlite3.Database(dbPath);

// Initialize mission tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS missions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    goal TEXT NOT NULL,
    duration_days INTEGER DEFAULT 7,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT 0,
    completed_at DATETIME
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS mission_checkpoints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_id INTEGER,
    day_number INTEGER,
    checkpoint_text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    completed_at DATETIME,
    FOREIGN KEY (mission_id) REFERENCES missions (id)
  )`);
});

// MISSION-04: Create a new mission
router.post('/', async (req, res) => {
  try {
    const { title, description, goal, durationDays = 7 } = req.body;

    if (!title || !goal) {
      return res.status(400).json({ error: 'Title and goal are required' });
    }

    // MISSION-04 Atomic Scope: Create mission and generate checkpoints
    const mission = await createMission({ title, description, goal, durationDays });
    const checkpoints = await generateCheckpoints(mission.id, goal, durationDays);

    res.json({
      success: true,
      mission: mission,
      checkpoints: checkpoints,
      message: `Mission "${title}" created with ${checkpoints.length} daily checkpoints`
    });

  } catch (error) {
    console.error('Create mission error:', error);
    res.status(500).json({ 
      error: 'Failed to create mission',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

// Get all missions
router.get('/', (req, res) => {
  db.all('SELECT * FROM missions ORDER BY created_at DESC', (err, missions) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch missions' });
    }
    res.json({ success: true, missions: missions });
  });
});

// Get mission with checkpoints
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM missions WHERE id = ?', [id], (err, mission) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch mission' });
    }
    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    
    // Get checkpoints for this mission
    db.all('SELECT * FROM mission_checkpoints WHERE mission_id = ? ORDER BY day_number', [id], (err, checkpoints) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch checkpoints' });
      }
      
      res.json({
        success: true,
        mission: mission,
        checkpoints: checkpoints
      });
    });
  });
});

// Complete a checkpoint
router.put('/:missionId/checkpoints/:checkpointId/complete', (req, res) => {
  const { missionId, checkpointId } = req.params;
  
  db.run(
    'UPDATE mission_checkpoints SET completed = 1, completed_at = CURRENT_TIMESTAMP WHERE id = ? AND mission_id = ?',
    [checkpointId, missionId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to complete checkpoint' });
      }
      
      // Check if all checkpoints are completed
      checkMissionCompletion(missionId);
      
      res.json({ success: true, message: 'Checkpoint completed' });
    }
  );
});

// Complete a mission
router.put('/:id/complete', (req, res) => {
  const { id } = req.params;
  
  db.run(
    'UPDATE missions SET completed = 1, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to complete mission' });
      }
      res.json({ success: true, message: 'Mission completed!' });
    }
  );
});

// MISSION-04: Create mission (atomic scope)
function createMission(missionData) {
  return new Promise((resolve, reject) => {
    const { title, description, goal, durationDays } = missionData;
    
    db.run(
      'INSERT INTO missions (title, description, goal, duration_days) VALUES (?, ?, ?, ?)',
      [title, description, goal, durationDays],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            title,
            description,
            goal,
            duration_days: durationDays,
            created_at: new Date().toISOString()
          });
        }
      }
    );
  });
}

// MISSION-04: Generate daily checkpoints (atomic scope)
function generateCheckpoints(missionId, goal, durationDays) {
  return new Promise((resolve, reject) => {
    const checkpoints = [];
    
    // Simple checkpoint generation based on goal
    for (let day = 1; day <= durationDays; day++) {
      const checkpointText = generateCheckpointText(goal, day, durationDays);
      checkpoints.push({
        mission_id: missionId,
        day_number: day,
        checkpoint_text: checkpointText
      });
    }
    
    // Save checkpoints to database
    const stmt = db.prepare('INSERT INTO mission_checkpoints (mission_id, day_number, checkpoint_text) VALUES (?, ?, ?)');
    
    checkpoints.forEach(checkpoint => {
      stmt.run([checkpoint.mission_id, checkpoint.day_number, checkpoint.checkpoint_text]);
    });
    
    stmt.finalize((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(checkpoints);
      }
    });
  });
}

// Generate checkpoint text based on goal
function generateCheckpointText(goal, day, totalDays) {
  const goalLower = goal.toLowerCase();
  
  // Simple template-based generation
  if (goalLower.includes('learn') || goalLower.includes('study')) {
    return `Day ${day}: Spend 30 minutes studying ${goal}`;
  } else if (goalLower.includes('exercise') || goalLower.includes('workout')) {
    return `Day ${day}: Complete a ${day === 1 ? 'light' : day <= 3 ? 'moderate' : 'full'} workout session`;
  } else if (goalLower.includes('write') || goalLower.includes('blog')) {
    return `Day ${day}: Write ${day === 1 ? 'an outline' : day <= 3 ? 'a draft' : 'final content'} for ${goal}`;
  } else if (goalLower.includes('read')) {
    return `Day ${day}: Read ${day === 1 ? '10' : day <= 3 ? '20' : '30'} pages of ${goal}`;
  } else {
    // Generic checkpoint
    const progress = day <= Math.ceil(totalDays / 3) ? 'start' : 
                   day <= Math.ceil(totalDays * 2 / 3) ? 'continue' : 'finish';
    return `Day ${day}: ${progress.charAt(0).toUpperCase() + progress.slice(1)} working on ${goal}`;
  }
}

// Check if mission is completed
function checkMissionCompletion(missionId) {
  db.get(
    'SELECT COUNT(*) as total, SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed FROM mission_checkpoints WHERE mission_id = ?',
    [missionId],
    (err, result) => {
      if (err || !result) return;
      
      if (result.completed === result.total) {
        // All checkpoints completed, mark mission as complete
        db.run('UPDATE missions SET completed = 1, completed_at = CURRENT_TIMESTAMP WHERE id = ?', [missionId]);
      }
    }
  );
}

module.exports = router; 