import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <FaSpinner className="text-blue-500 text-4xl animate-spin" />
            <span className="ml-2 text-gray-700 text-lg">Carregando...</span>
        </div>
    );
};

export default LoadingSpinner;