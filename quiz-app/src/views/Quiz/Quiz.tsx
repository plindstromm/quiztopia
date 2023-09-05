import React, { useState } from 'react';
import './Quiz.scss';
import Header from '../../components/Header/Header';
import Quizform from '../../components/Quizform/Quizform';
import Mapbox from '../../components/Mapbox/Mapbox';
import Displayquiz from '../../components/Displayquiz/Displayquiz';

const Quiz: React.FC = () => {
    const [showDisplayQuiz, setShowDisplayQuiz] = useState<boolean>(false);

    const toggleDisplayQuiz = () => {
        setShowDisplayQuiz(!showDisplayQuiz);
    };

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
            <button onClick={toggleDisplayQuiz}>
                Visa quiz
            </button>
            {showDisplayQuiz && <Displayquiz/>}
        </div>
    );
};

export default Quiz;

