import React from 'react';
import { useSuggestions } from '../logic/useSuggestions';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SuggestionCard = () => {
    const { suggestion, isLoading, error, generateSuggestion } = useSuggestions();

    return (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="text-emerald-600" size={24} />
                    AI Suggestion
                </h2>
            </div>

            {!suggestion && !isLoading && (
                <button
                    onClick={generateSuggestion}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition flex items-center justify-center gap-2"
                >
                    <Sparkles size={20} />
                    Get AI Suggestion
                </button>
            )}

            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-emerald-600" size={32} />
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {suggestion && !isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{suggestion.message}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Meal Ideas:</h3>
                        <div className="space-y-2">
                            {suggestion.mealIdeas?.map((idea, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition"
                                >
                                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700">{idea}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={generateSuggestion}
                        className="w-full bg-white text-emerald-600 border-2 border-emerald-500 py-2 rounded-lg font-medium hover:bg-emerald-50 transition"
                    >
                        Generate New Suggestion
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default SuggestionCard;
