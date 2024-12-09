import React, { useState, useEffect } from 'react';
import diceIcon from '../assets/icons/icon-dice.svg';
import desktopDivider from '../assets/icons/pattern-divider-desktop.svg';
import mobileDivider from '../assets/icons/pattern-divider-mobile.svg';
import '../styles/MainContent.css';

function MainContent() {
    const [advice, setAdvice] = useState('');
    const [adviceId, setAdviceId] = useState('');
    const [loading, setLoading] = useState(false); // Состояние загрузки

    // Fetch advice from API
    const fetchAdvice = async () => {
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice);
            setAdviceId(data.slip.id);
        } catch (error) {
            console.error('Error fetching advice:', error);
            setAdvice('Oops! Something went wrong.');
            setAdviceId('???');
        } finally {
            setLoading(false); // Сбрасываем состояние загрузки
        }
    };

    // Fetch advice on first render
    useEffect(() => {
        fetchAdvice();
    }, []);

    return (
        <main className="card">
            <h1 className="advice-id">ADVICE #{loading ? '...' : adviceId}</h1>
            <p className="advice-text">{loading ? 'Loading...' : advice}</p>
            <picture className="divider">
                <source srcSet={mobileDivider} media="(max-width: 375px)" />
                <img src={desktopDivider} alt="Divider" />
            </picture>
            <button className="dice-button" onClick={fetchAdvice}>
                <img src={diceIcon} alt="Generate Advice" />
            </button>
        </main>
    );
}

export default MainContent;
