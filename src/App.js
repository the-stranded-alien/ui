import React, { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import TransformerPage from './pages/TransformerPage';
import MotorPage from './pages/MotorPage';
import GeneratorPage from './pages/GeneratorPage';
import TurbinePage from './pages/TurbinePage';
import ScrollToTop from './components/ScrollToTop';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './style.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [load, updateLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateLoad(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <Preloader load={load} />
            <div className="App" id={load ? 'no-scroll' : 'scroll'}>
                <NavBar />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/transformer" element={<TransformerPage />} />
                    <Route path="/motor" element={<MotorPage />} />
                    <Route path="/generator" element={<GeneratorPage />} />
                    <Route path="/turbine" element={<TurbinePage />} />
                    <Route path="*" element={<HomePage to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
