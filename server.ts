import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI client on the server
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Daily Prophetic Devotional API
app.post('/api/gemini/devotional', async (req, res) => {
  try {
    const { chapter, verseRef } = req.body;
    if (!ai) {
      return res.json({
        devotional: "The Lord is our stronghold in every sector. Step forth into the Blackout with unshakeable faith — In Lumine Veritas!",
        verse: verseRef || "Philippians 4:13",
        prayer: "May Jesus Reign in this battle and crown our fellowship with victorious light."
      });
    }

    const prompt = `Provide an inspiring 2-sentence holy battle devotional for a Christian fellowship warrior confronting Chapter ${chapter || 1} in a cyber-cathedral world. Ground it in scripture ${verseRef || 'Philippians 4:13'}. Include a 1-sentence closing prayer. Output in JSON format with keys 'devotional', 'verse', 'prayer'.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are the Cyber-Cathedral Scribe for ChristFire: Omega Protocol (Vann Family Ventures LLC). Always holy, uplifting, resolute, and strictly biblical. Motto: In Lumine Veritas | May Jesus Reign.",
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Devotional API error:', err?.message || err);
    res.json({
      devotional: "The light shines in the darkness, and the darkness has not overcome it. March forward, Fellowship!",
      verse: req.body.verseRef || "John 1:5",
      prayer: "May Jesus Reign in our hearts and shatter every gloom shield today. Amen."
    });
  }
});

// 2. Dynamic Boss Combat Dialogue & Reactive Taunts
app.post('/api/gemini/boss-banter', async (req, res) => {
  try {
    const { bossName, bossHpPercent, shieldActive, recentAction } = req.body;
    if (!ai) {
      const fallbackTaunts = [
        "Your holy light will be swallowed whole in the Blackout!",
        "Feel the crushing resonance of the Gloom Core!",
        "No prayer can protect your fellowship from the Syndicate!",
        "Your shields fracture before my dark heart!"
      ];
      return res.json({
        taunt: fallbackTaunts[Math.floor(Math.random() * fallbackTaunts.length)]
      });
    }

    const prompt = `Boss: ${bossName || 'Commander Malice'}. Boss HP: ${bossHpPercent}%. Gloom Shield: ${shieldActive ? 'Active' : 'Shattered'}. Player Action: ${recentAction || 'striking'}. Generate a dramatic, menacing 1-sentence combat taunt (max 18 words).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are the cyber-cathedral Gloom Syndicate Boss in ChristFire: Omega Protocol. Intimidating, metallic, gothic sci-fi villain.",
      },
    });

    res.json({ taunt: response.text?.trim() || "The shadows bow to no fellowship!" });
  } catch (err) {
    res.json({ taunt: "Your pathetic sparks cannot halt the inevitable Blackout!" });
  }
});

// 3. Tactical Counselor (Beacon of Antioch)
app.post('/api/gemini/tactical-counsel', async (req, res) => {
  try {
    const { chapter, bossName } = req.body;
    if (!ai) {
      return res.json({
        advice: "Time your dodge bar reflexes to preserve energy and combo streaks. Reserve Philippians 4:13 until the boss shield is active for maximum 3.5x shatter damage."
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Provide 2 punchy, tactical combat tips (max 30 words) for defeating ${bossName || 'Commander Malice'} in Chapter ${chapter || 1} of ChristFire: Omega Protocol. Focus on timing active dodges and using scripture cards on boss shields.`,
      config: {
        systemInstruction: "You are the Beacon of Antioch Strategic Scribe in ChristFire: Omega Protocol. Wise, concise battle coach.",
      },
    });

    res.json({ advice: response.text?.trim() });
  } catch (err) {
    res.json({ advice: "Time your dodges precisely to maintain your damage combo multiplier." });
  }
});

// Start Express server with Vite middleware in dev or static in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ChristFire: Omega Protocol server running on port ${PORT}`);
  });
}

startServer();
