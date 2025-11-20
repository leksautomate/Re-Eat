import React from 'react';
import MealForm from '../components/MealForm';
import SuggestionCard from '../components/SuggestionCard';

const Home = () => {
    return (
        <div className="space-y-6">
            <MealForm />
            <SuggestionCard />
        </div>
    );
};

export default Home;
