const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const moment = require('moment');
const router = express.Router();

// TASK-02: Task Extraction - Never modifies chat history, only creates new tasks
const dbPath = process.env.DB_PATH || path.join(__dirname, '../../taskmate.db');
const db = new sqlite3.Database(dbPath);

// Initialize database table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    deadline DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT 0,
    priority TEXT DEFAULT 'medium'
  )`);
});

// TASK-02: Extract tasks from natural conversation
router.post('/extract', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // TASK-02 Atomic Scope: Only extract tasks, never modify chat history
    const extractedTasks = await extractTasksFromMessage(message);

    if (extractedTasks.length === 0) {
      return res.json({
        success: true,
        tasks: [],
        message: 'No tasks detected in message'
      });
    }

    // Save extracted tasks to database
    const savedTasks = [];
    for (const task of extractedTasks) {
      const savedTask = await saveTask(task);
      savedTasks.push(savedTask);
    }

    res.json({
      success: true,
      tasks: savedTasks,
      message: `Extracted ${savedTasks.length} task(s) from your message`
    });

  } catch (error) {
    console.error('Task extraction error:', error);
    res.status(500).json({ 
      error: 'Failed to extract tasks',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

// Get all tasks
router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.json({ success: true, tasks: rows });
  });
});

// Mark task as completed
router.put('/:id/complete', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update task' });
    }
    res.json({ success: true, message: 'Task marked as completed' });
  });
});

// TASK-02: Task extraction logic (atomic scope)
async function extractTasksFromMessage(message) {
  const tasks = [];
  
  // Simple regex patterns for task detection
  const taskPatterns = [
    // "Need to finish report by Friday"
    /(?:need to|have to|must|should)\s+([^,\.]+?)\s+(?:by|before|due)\s+([^,\.]+)/gi,
    // "Client presentation due Thursday 3PM"
    /([^,\.]+?)\s+(?:due|by|before)\s+([^,\.]+)/gi,
    // "I need to do X"
    /(?:i\s+)?(?:need to|have to|must|should)\s+([^,\.]+)/gi
  ];

  for (const pattern of taskPatterns) {
    let match;
    while ((match = pattern.exec(message)) !== null) {
      const title = match[1]?.trim();
      const deadlineText = match[2]?.trim();
      
      if (title && title.length > 2) {
        const deadline = deadlineText ? parseDeadline(deadlineText) : null;
        
        tasks.push({
          title: title,
          description: `Extracted from: "${message}"`,
          deadline: deadline,
          priority: 'medium'
        });
      }
    }
  }

  return tasks;
}

// Parse deadline text to datetime
function parseDeadline(deadlineText) {
  const text = deadlineText.toLowerCase();
  
  // Simple deadline parsing (Phase 1 scope)
  if (text.includes('today')) {
    return moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
  }
  if (text.includes('tomorrow')) {
    return moment().add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
  }
  if (text.includes('next week')) {
    return moment().add(1, 'week').startOf('week').add(5, 'days').format('YYYY-MM-DD HH:mm:ss');
  }
  
  // Day of week parsing
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  for (let i = 0; i < days.length; i++) {
    if (text.includes(days[i])) {
      const targetDay = moment().day(i + 1);
      if (targetDay.isBefore(moment())) {
        targetDay.add(1, 'week');
      }
      return targetDay.endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
  }
  
  return null;
}

// Save task to database
function saveTask(task) {
  return new Promise((resolve, reject) => {
    const { title, description, deadline, priority } = task;
    
    db.run(
      'INSERT INTO tasks (title, description, deadline, priority) VALUES (?, ?, ?, ?)',
      [title, description, deadline, priority],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            title,
            description,
            deadline,
            priority,
            created_at: new Date().toISOString()
          });
        }
      }
    );
  });
}

module.exports = router; 