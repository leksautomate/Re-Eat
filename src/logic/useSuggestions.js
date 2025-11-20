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
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            });

            const content = response.choices[0].message.content;
            const parsed = JSON.parse(content);
            setSuggestion(parsed);
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
