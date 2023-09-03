import './App.scss'
import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './views/Home/Home';
import Quiz from './views/Quiz/Quiz';

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/quiz',
            element: <Quiz/>
        }
    ]);

    return (
        <div className='App'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
