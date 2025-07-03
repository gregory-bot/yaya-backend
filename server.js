import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

app.post('/api/gemini', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });
    res.json({ text: response.text });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Gemini API error', details: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Gemini backend running on port ${PORT}`));