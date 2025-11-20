import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db, isConfigured } from '../firebase';
import { useAuth } from './useAuth';

// Demo mode storage
let demoMeals = [];

export const useMeals = () => {
    const { user, demoMode } = useAuth();
    const queryClient = useQueryClient();

    const mealsQuery = useQuery({
        queryKey: ['meals', user?.uid],
        queryFn: async () => {
            if (!user) return [];

            if (demoMode || !isConfigured || !db) {
                // Return demo meals from local storage
                return [...demoMeals].sort((a, b) => b.timestamp - a.timestamp);
            }

            const mealsRef = collection(db, 'users', user.uid, 'meals');
            const q = query(mealsRef, orderBy('timestamp', 'desc'), limit(20));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        enabled: !!user,
    });

    const addMealMutation = useMutation({
        mutationFn: async (mealData) => {
            if (!user) throw new Error('User not authenticated');

            if (demoMode || !isConfigured || !db) {
                // Add to demo storage
                const newMeal = {
                    id: `demo-${Date.now()}`,
                    ...mealData,
                    timestamp: new Date(),
                };
                demoMeals.push(newMeal);
                return newMeal;
            }

            const mealsRef = collection(db, 'users', user.uid, 'meals');
            return addDoc(mealsRef, {
                ...mealData,
                timestamp: new Date(),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['meals', user?.uid]);
        },
    });

    const getRecentMeals = async (count = 5) => {
        if (!user) return [];

        if (demoMode || !isConfigured || !db) {
            return [...demoMeals]
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, count);
        }

        const mealsRef = collection(db, 'users', user.uid, 'meals');
        const q = query(mealsRef, orderBy('timestamp', 'desc'), limit(count));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    return {
        meals: mealsQuery.data || [],
        isLoading: mealsQuery.isLoading,
        error: mealsQuery.error,
        addMeal: addMealMutation.mutate,
        isAdding: addMealMutation.isPending,
        getRecentMeals,
    };
};
