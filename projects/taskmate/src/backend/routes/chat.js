const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

// Initialize OpenAI (CHAT-01: GPT-4 level conversation)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CHAT-01: Chat Interface - Only renders messages, never modifies chat history
router.post('/message', async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Prepare conversation context for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are TaskMate, an AI co-pilot for mission-driven productivity. 
        Your role is to have natural conversations while being aware that task extraction 
        happens separately (TASK-02 component). Focus on being helpful and engaging.
        
        Key behaviors:
        - Be conversational and supportive
        - Don't try to extract tasks yourself (that's handled by TASK-02)
        - If users mention tasks/deadlines, acknowledge them naturally
        - Keep responses concise but helpful`
      },
      ...chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // CHAT-01 Atomic Scope: Only return the response, don't modify anything else
    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

// Get chat history (read-only, never modifies)
router.get('/history', (req, res) => {
  // CHAT-01 Atomic Scope: This would typically fetch from database
  // For now, return empty array (chat history managed by frontend)
  res.json({
    success: true,
    history: []
  });
});

module.exports = router; 