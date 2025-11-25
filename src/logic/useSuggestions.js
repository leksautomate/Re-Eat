import { useState } from 'react';
import { openai } from '../lib/openai';
import { useMeals } from './useMeals';

export const useSuggestions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState(null);
    const [error, setError] = useState(null);
    const { getRecentMeals } = useMeals();

    const generateSuggestion = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const recentMeals = await getRecentMeals(5);

            if (recentMeals.length === 0) {
                setSuggestion({
                    message: "Start logging your meals to get personalized suggestions!",
                    mealIdeas: [
                        "Grilled chicken with quinoa and steamed broccoli",
                        "Salmon with sweet potato and mixed greens",
                        "Lentil curry with brown rice and spinach"
                    ]
                });
                setIsLoading(false);
                return;
            }

            const mealHistory = recentMeals.map(m => `${m.name} (${m.category})`).join(', ');

            const prompt = `You are a nutrition assistant. Based on these recent meals: ${mealHistory}.
      
Analyze the food groups and suggest:
1. What food category is missing or underrepresented
2. A brief explanation (1-2 sentences)
3. Exactly 3 simple meal ideas that include the missing food group

Format your response as JSON:
{
  "message": "brief analysis here",
  "mealIdeas": ["meal 1", "meal 2", "meal 3"]
}`;

            const response = await openai.chat.completions.create({
                model: "x-ai/grok-4.1-fast:free",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                extra_body: {
                    reasoning: {
                        enabled: true
                    }
                }
            });

            const content = response.choices[0].message.content;
            const reasoning = response.choices[0].message.reasoning_details; // Capture reasoning

            console.log('Raw AI Content:', content);
            console.log('AI Reasoning:', reasoning);

            // Clean content of markdown code blocks if present
            const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();

            let parsed;
            try {
                parsed = JSON.parse(cleanContent);
            } catch (e) {
                console.error("JSON Parse Error. Content was:", content);
                throw new Error("Failed to parse AI response");
            }

            setSuggestion({ ...parsed, reasoning }); // Include reasoning in suggestion object
        } catch (err) {
            console.error('AI Suggestion Error:', err);
            setError(err.message || 'Failed to generate suggestion');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        suggestion,
        isLoading,
        error,
        generateSuggestion,
    };
};
