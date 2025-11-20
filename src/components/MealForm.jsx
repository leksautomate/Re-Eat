import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMeals } from '../logic/useMeals';
import { PlusCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOD_CATEGORIES = [
    { value: 'carbs', label: '🍞 Carbs', color: 'bg-amber-100 text-amber-700' },
    { value: 'protein', label: '🍗 Protein', color: 'bg-red-100 text-red-700' },
    { value: 'veggies', label: '🥗 Veggies', color: 'bg-green-100 text-green-700' },
    { value: 'fruits', label: '🍎 Fruits', color: 'bg-pink-100 text-pink-700' },
    { value: 'dairy', label: '🥛 Dairy', color: 'bg-blue-100 text-blue-700' },
    { value: 'fats', label: '🥑 Fats', color: 'bg-yellow-100 text-yellow-700' },
];

const MealForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { addMeal, isAdding } = useMeals();
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = (data) => {
        addMeal(data, {
            onSuccess: () => {
                reset();
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2000);
            },
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Log a Meal</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        What did you eat?
                    </label>
                    <input
                        {...register('name', { required: 'Meal name is required' })}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                        placeholder="e.g., Grilled chicken salad"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Food Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {FOOD_CATEGORIES.map((category) => (
                            <label
                                key={category.value}
                                className="relative cursor-pointer"
                            >
                                <input
                                    {...register('category', { required: 'Please select a category' })}
                                    type="radio"
                                    value={category.value}
                                    className="peer sr-only"
                                />
                                <div className={`${category.color} px-4 py-3 rounded-lg text-center font-medium transition border-2 border-transparent peer-checked:border-emerald-500 peer-checked:ring-2 peer-checked:ring-emerald-200 hover:scale-105`}>
                                    {category.label}
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isAdding}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isAdding ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Logging...
                        </>
                    ) : (
                        <>
                            <PlusCircle size={20} />
                            Log Meal
                        </>
                    )}
                </button>
            </form>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2"
                    >
                        <CheckCircle2 size={20} />
                        <span className="font-medium">Meal logged successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MealForm;
