import React from 'react';
import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './views/Home/Home';

function App() {
  
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        }
    ]);

    return (
        <div className='App'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
