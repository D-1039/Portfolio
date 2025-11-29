/**
 * Hugging Face API Proxy Server
 * 
 * Purpose: Bypass CORS restrictions when calling HF Router API from browser
 * Dependencies: express, cors, dotenv
 * Run: node hf-proxy.js
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ========== Configuration ==========
const app = express();
const PORT = process.env.PORT || 3000;
const HF_ROUTER_URL = 'https://router.huggingface.co/v1/chat/completions';
const MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';

// ========== Middleware ==========
app.use(cors());
app.use(express.json());

// ========== Routes ==========
/**
 * POST /api/chat
 * Proxy endpoint for Hugging Face chat completions
 * @body {string} prompt - The full prompt including system message
 * @body {string} apiKey - Hugging Face API key
 * @returns {Array} - Array with generated_text object
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, apiKey } = req.body;

    // Validation
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const key = apiKey || process.env.HF_API_KEY;
    if (!key) {
      return res.status(401).json({ error: 'API key is required' });
    }

    // Call Hugging Face Router with OpenAI-compatible format
    const response = await fetch(HF_ROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { 
            role: 'system', 
            content: "You are Dhruv's assistant. Be concise, friendly, direct. Avoid overclaiming; note learning areas." 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    // Parse response
    const text = await response.text();
    let data;
    
    try { 
      data = JSON.parse(text); 
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return res.status(502).json({ 
        error: `Invalid response from router: ${text.substring(0, 200)}` 
      });
    }

    // Handle errors from HF API
    if (data.error) {
      console.error('HF API error:', data.error);
      return res.status(502).json({ error: data.error });
    }

    // Extract content from OpenAI-compatible response
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      console.error('No content in response:', data);
      return res.status(502).json({ 
        error: 'No content in router response' 
      });
    }

    // Return in format expected by frontend (array with generated_text)
    res.json([{ generated_text: content }]);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', model: MODEL });
});

// ========== Start Server ==========
app.listen(PORT, () => {
  console.log(`HF Proxy running on http://localhost:${PORT}`);
  console.log(`Model: ${MODEL}`);
});
