import React from 'react';
import { useMeals } from '../logic/useMeals';
import { format } from 'date-fns';
import { Loader2, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_STYLES = {
    carbs: 'bg-amber-100 text-amber-700',
    protein: 'bg-red-100 text-red-700',
    veggies: 'bg-green-100 text-green-700',
    fruits: 'bg-pink-100 text-pink-700',
    dairy: 'bg-blue-100 text-blue-700',
    fats: 'bg-yellow-100 text-yellow-700',
};

const MealList = () => {
    const { meals, isLoading } = useMeals();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-emerald-600" size={32} />
            </div>
        );
    }

    if (meals.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <UtensilsCrossed className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500">No meals logged yet. Start tracking your diet!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Recent Meals</h2>
            {meals.map((meal, index) => (
                <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
                >
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                        <p className="text-sm text-gray-500">
                            {meal.timestamp?.toDate ? format(meal.timestamp.toDate(), 'MMM d, h:mm a') :
                                meal.timestamp instanceof Date ? format(meal.timestamp, 'MMM d, h:mm a') : 'Just now'}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${CATEGORY_STYLES[meal.category] || 'bg-gray-100 text-gray-700'}`}>
                        {meal.category}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default MealList;
