import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'AI Literacy Passport' });
  });

  // API Endpoint: AI Prompt Coach
  app.post('/api/prompt-coach', async (req, res) => {
    try {
      const { userPrompt } = req.body;
      if (!userPrompt || typeof userPrompt !== 'string' || !userPrompt.trim()) {
        res.status(400).json({ error: 'Please provide a valid prompt string to evaluate.' });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Draft prompt to evaluate: "${userPrompt.trim()}"`,
        config: {
          systemInstruction: `You are a friendly prompting coach for absolute beginners learning AI literacy. Given a user's draft prompt, score it 1–5 on three dimensions: Clarity, Specificity, and Context. Then rewrite their prompt as a stronger version that a beginner could learn from. Keep your entire response under 100 words, use an encouraging tone, avoid jargon, and always explain your rewrite in one short sentence.`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              clarityScore: {
                type: Type.INTEGER,
                description: 'Score from 1 to 5 for how clear the prompt instruction is'
              },
              specificityScore: {
                type: Type.INTEGER,
                description: 'Score from 1 to 5 for how detailed/specific constraints are'
              },
              contextScore: {
                type: Type.INTEGER,
                description: 'Score from 1 to 5 for background context provided'
              },
              rewrittenPrompt: {
                type: Type.STRING,
                description: 'An improved, beginner-friendly version of the user prompt'
              },
              explanation: {
                type: Type.STRING,
                description: 'One short sentence explaining why the rewrite is stronger'
              },
              encouragingTip: {
                type: Type.STRING,
                description: 'A brief 1-sentence tip for future prompting'
              }
            },
            required: ['clarityScore', 'specificityScore', 'contextScore', 'rewrittenPrompt', 'explanation', 'encouragingTip']
          }
        }
      });

      const rawText = response.text?.trim() || '{}';
      const parsed = JSON.parse(rawText);

      const clarity = Math.min(5, Math.max(1, Number(parsed.clarityScore) || 3));
      const specificity = Math.min(5, Math.max(1, Number(parsed.specificityScore) || 3));
      const context = Math.min(5, Math.max(1, Number(parsed.contextScore) || 3));
      const overallScore = Number(((clarity + specificity + context) / 3).toFixed(1));

      res.json({
        scores: {
          clarity,
          specificity,
          context
        },
        overallScore,
        rewrittenPrompt: parsed.rewrittenPrompt || 'Draft an email explaining a project update with 3 bullet points.',
        explanation: parsed.explanation || 'Adding specific output formatting rules makes the AI response immediately usable.',
        encouragingTip: parsed.encouragingTip || 'Tip: Mention who your audience is to get the perfect tone!'
      });
    } catch (err) {
      console.error('Error in /api/prompt-coach:', err);
      // Return a friendly fallback state if API key or rate limit fails
      res.status(500).json({
        error: 'Unable to connect to Gemini Prompt Coach at the moment.',
        fallback: {
          scores: { clarity: 4, specificity: 3, context: 3 },
          overallScore: 3.3,
          rewrittenPrompt: 'Act as a helpful consultant. Summarize the key points into 3 action items and 1 recommendation.',
          explanation: 'Adding a clear role persona and structured bullet count improves quality dramatically.',
          encouragingTip: 'Try specifying who will read the response!'
        }
      });
    }
  });

  // API Endpoint: Dynamic Daily Challenge Generator
  app.post('/api/daily-challenge', async (req, res) => {
    try {
      const todayStr = new Date().toISOString().split('T')[0];

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Generate today's AI Literacy Daily Challenge question for ${todayStr}. Focus on modern AI literacy, AI news, or practical AI application.`,
        config: {
          systemInstruction: 'You are an educational AI content creator for AI Literacy Passport. Create a fun, bite-sized daily quiz question based on recent AI trends (LLMs, AI agents, multimodal AI, ethical AI, or workspace productivity). Return clean JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: {
                type: Type.STRING,
                description: 'A catchy 3-6 word news headline or topic title'
              },
              question: {
                type: Type.STRING,
                description: 'The quiz question text'
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4 multiple choice answer options'
              },
              correctIndex: {
                type: Type.INTEGER,
                description: 'Zero-based index of the correct answer (0, 1, 2, or 3)'
              },
              explanation: {
                type: Type.STRING,
                description: 'A 1-2 sentence explanation of why the answer is correct'
              },
              topic: {
                type: Type.STRING,
                description: 'Short topic tag, e.g. "AI Agents", "Multimodal", "AI News"'
              }
            },
            required: ['headline', 'question', 'options', 'correctIndex', 'explanation', 'topic']
          }
        }
      });

      const rawText = response.text?.trim() || '{}';
      const parsed = JSON.parse(rawText);

      res.json({
        id: `daily-${todayStr}`,
        date: todayStr,
        headline: parsed.headline || 'Today in AI: Agentic Workflows',
        question: parsed.question || 'What is the key advantage of an AI Agent using tool-calling capabilities?',
        options: parsed.options || [
          'It can perform web searches and execute code to complete complex tasks',
          'It changes its color theme automatically',
          'It replaces human decision-making completely',
          'It speeds up monitor refresh rates'
        ],
        correctIndex: typeof parsed.correctIndex === 'number' ? parsed.correctIndex : 0,
        explanation: parsed.explanation || 'Tool calling allows models to retrieve real-time data and trigger external actions rather than relying solely on static training weights.',
        topic: parsed.topic || 'AI Agents'
      });
    } catch (err) {
      console.error('Error in /api/daily-challenge:', err);
      // Fallback challenge if Gemini API is temporarily unavailable
      res.json({
        id: `daily-fallback-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        headline: 'Daily Byte: System vs User Prompts',
        question: 'Which type of prompt is best suited for establishing permanent persona guardrails and safety rules?',
        options: [
          'System Prompt',
          'User Message',
          'URL Parameter',
          'CSS Style Sheet'
        ],
        correctIndex: 0,
        explanation: 'System prompts sit at the top of the chat hierarchy to set consistent assistant behaviors across all user turns.',
        topic: 'Prompt Architecture'
      });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
