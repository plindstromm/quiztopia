import React from 'react';
import './Quiz.scss';
import Header from '../../components/Header/Header';
import Quizform from '../../components/Quizform/Quizform';
import Mapbox from '../../components/Mapbox/Mapbox';
import Displayquiz from '../../components/Displayquiz/Displayquiz';



function Quiz() {
    return (
        <div className='main'>
            <Header />
            <section className='main-frame'>
                <aside className='main-frame-right'>
                    <Quizform/>
                </aside>
                <aside className='main-frame-left'>
                    <Mapbox/>
                </aside>
              
            </section>
            <Displayquiz/>
        </div>
    );
}

export default Quiz;
