import OpenAI from 'openai';

// TODO: Replace with your OpenRouter API Key
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = 'http://localhost:5173'; // Update for production
const SITE_NAME = 'Re-Eat';

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OPENROUTER_API_KEY,
    dangerouslyAllowBrowser: true, // Required for client-side usage (MVP only)
    defaultHeaders: {
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
    },
});
