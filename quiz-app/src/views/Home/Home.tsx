import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

function Home() {
    return(
        
        <main>
            <Header/>

            <section className='login-frame'>
                <Login/>
            </section>
                
        </main>
    )
}

export default Home;