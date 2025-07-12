const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const moment = require('moment');
const cron = require('node-cron');
const router = express.Router();

// NOTIFY-03: Notification Engine - Isolated from UI components, only sends notifications
const dbPath = process.env.DB_PATH || path.join(__dirname, '../../taskmate.db');
const db = new sqlite3.Database(dbPath);

// Anti-overreach protocols from spec
const MAX_NOTIFICATIONS = parseInt(process.env.MAX_NOTIFICATIONS_PER_DAY) || 3;
const MIN_INTERVAL = parseInt(process.env.MIN_NOTIFICATION_INTERVAL_HOURS) || 2;
const NOTIFICATION_LEAD_TIME = parseInt(process.env.NOTIFICATION_LEAD_TIME_HOURS) || 3;

// Initialize notification tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER,
    message TEXT NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    dismissed BOOLEAN DEFAULT 0,
    dismissed_at DATETIME,
    FOREIGN KEY (task_id) REFERENCES tasks (id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS notification_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enabled BOOLEAN DEFAULT 1,
    last_dismiss DATETIME,
    daily_count INTEGER DEFAULT 0,
    last_reset_date DATE DEFAULT CURRENT_DATE
  )`);
});

// NOTIFY-03: Check and send notifications
router.post('/check', async (req, res) => {
  try {
    if (!process.env.ENABLE_NOTIFICATIONS || process.env.ENABLE_NOTIFICATIONS !== 'true') {
      return res.json({ success: true, notifications: [], message: 'Notifications disabled' });
    }

    // Check notification settings
    const settings = await getNotificationSettings();
    if (!settings.enabled) {
      return res.json({ success: true, notifications: [], message: 'Notifications disabled by user' });
    }

    // Reset daily count if it's a new day
    await resetDailyCountIfNeeded(settings);

    // Check frequency caps
    if (settings.daily_count >= MAX_NOTIFICATIONS) {
      return res.json({ 
        success: true, 
        notifications: [], 
        message: 'Daily notification limit reached' 
      });
    }

    // Get pending notifications
    const notifications = await getPendingNotifications();

    res.json({
      success: true,
      notifications: notifications,
      settings: {
        dailyCount: settings.daily_count,
        maxDaily: MAX_NOTIFICATIONS,
        enabled: settings.enabled
      }
    });

  } catch (error) {
    console.error('Notification check error:', error);
    res.status(500).json({ 
      error: 'Failed to check notifications',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

// Dismiss notification
router.put('/:id/dismiss', async (req, res) => {
  try {
    const { id } = req.params;
    
    db.run(
      'UPDATE notifications SET dismissed = 1, dismissed_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to dismiss notification' });
        }
        
        // Update last dismiss time in settings
        db.run('UPDATE notification_settings SET last_dismiss = CURRENT_TIMESTAMP WHERE id = 1');
        
        res.json({ success: true, message: 'Notification dismissed' });
      }
    );
  } catch (error) {
    console.error('Dismiss notification error:', error);
    res.status(500).json({ error: 'Failed to dismiss notification' });
  }
});

// Toggle notifications
router.put('/settings/toggle', async (req, res) => {
  try {
    const { enabled } = req.body;
    
    db.run(
      'UPDATE notification_settings SET enabled = ? WHERE id = 1',
      [enabled ? 1 : 0],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update notification settings' });
        }
        res.json({ success: true, enabled: enabled });
      }
    );
  } catch (error) {
    console.error('Toggle notifications error:', error);
    res.status(500).json({ error: 'Failed to toggle notifications' });
  }
});

// NOTIFY-03: Get pending notifications (atomic scope)
async function getPendingNotifications() {
  return new Promise((resolve, reject) => {
    const now = moment();
    const leadTime = moment().add(NOTIFICATION_LEAD_TIME, 'hours');
    
    // Get tasks with deadlines within notification window
    const query = `
      SELECT t.id, t.title, t.deadline, t.completed
      FROM tasks t
      WHERE t.deadline BETWEEN ? AND ?
      AND t.completed = 0
      AND t.id NOT IN (
        SELECT task_id FROM notifications 
        WHERE task_id IS NOT NULL AND dismissed = 0
      )
      ORDER BY t.deadline ASC
    `;
    
    db.all(query, [now.format('YYYY-MM-DD HH:mm:ss'), leadTime.format('YYYY-MM-DD HH:mm:ss')], (err, tasks) => {
      if (err) {
        reject(err);
        return;
      }
      
      const notifications = tasks.map(task => ({
        id: `task-${task.id}`,
        taskId: task.id,
        title: task.title,
        deadline: task.deadline,
        message: `Hey! You mentioned needing to ${task.title} by ${moment(task.deadline).format('MMM D, h:mm A')}. Need help? (Reply HELP or SNOOZE 1h)`,
        type: 'task_reminder',
        priority: 'medium'
      }));
      
      resolve(notifications);
    });
  });
}

// Get notification settings
function getNotificationSettings() {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM notification_settings WHERE id = 1', (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (!row) {
        // Create default settings
        db.run('INSERT INTO notification_settings (id, enabled) VALUES (1, 1)', function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve({ id: 1, enabled: true, daily_count: 0, last_dismiss: null });
        });
      } else {
        resolve(row);
      }
    });
  });
}

// Reset daily count if needed
function resetDailyCountIfNeeded(settings) {
  return new Promise((resolve, reject) => {
    const today = moment().format('YYYY-MM-DD');
    
    if (settings.last_reset_date !== today) {
      db.run(
        'UPDATE notification_settings SET daily_count = 0, last_reset_date = ? WHERE id = 1',
        [today],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    } else {
      resolve();
    }
  });
}

// Schedule notification checks (runs every 30 minutes)
if (process.env.ENABLE_NOTIFICATIONS === 'true') {
  cron.schedule('*/30 * * * *', async () => {
    try {
      console.log('Running scheduled notification check...');
      // This would trigger notification sending logic
      // For now, just log that it's working
    } catch (error) {
      console.error('Scheduled notification check failed:', error);
    }
  });
}

module.exports = router; 