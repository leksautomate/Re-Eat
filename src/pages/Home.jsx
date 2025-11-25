import React from 'react';
import MealForm from '../components/MealForm';
import SuggestionCard from '../components/SuggestionCard';
import MealList from '../components/MealList';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
            <div className="w-full max-w-2xl space-y-6">
                <MealForm />
                <SuggestionCard />
                <MealList />
            </div>
        </div>
    );
};

export default Home;
