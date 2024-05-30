import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import NavBar from './pages/Component/Navbar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/PagineMenu/Home.jsx';
import Feedback from "./pages/Component/PagineMenu/Feedback.jsx";
import Contatti from "./pages/Component/Contatti/Contatti.jsx";
import NotFound from "./pages/Component/NotFound/NotFound.jsx";
import ProfileUR from "./pages/Component/Profili/ProfileUR.jsx";
import Login from "./pages/Component/Login/Login.jsx";
import store from "./pages/Component/Login/Store_Redux/Store.js";
import Full from "./pages/Component/Risultati/Full.jsx";
import Information from "./pages/Component/Risultati/Information.jsx";
import POSD from './pages/Component/POSD/POSD.jsx'; // Importa il componente POSD
import './App.css';
import { useState, useEffect } from 'react';

function App() {
    // Utilizza useSelector per leggere lo stato di autenticazione dell'utente
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [patterns, setPatterns] = useState([]);

    useEffect(() => {
        const initialPatterns = [];
        setPatterns(initialPatterns);
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <NavBar />
                            <div className='flex items-center'>
                                <Searchbar />
                            </div>
                            <Home />
                        </div>
                    } />
                    <Route path="/Full/:title" element={
                        <div>
                            <NavBar />
                            <div className='flex items-center'>
                                <Searchbar />
                            </div>
                            <Full patterns={patterns} />
                        </div>
                    } />
                    <Route path="/Information/:title" element={
                        <div>
                            <NavBar />
                            <div className='flex items-center'>
                                <Searchbar />
                            </div>
                            <Information />
                        </div>
                    } />
                    <Route path="/Contatti" element={
                        <div>
                            <NavBar />
                            <Contatti />
                        </div>
                    } />
                    <Route path="/POSD" element={
                        <div>
                            <NavBar />
                            <Searchbar />
                            <POSD />

                        </div>
                    } />
                    <Route path="/Login" element={
                        <div>
                            <NavBar />
                            <Login />
                        </div>
                    } />
                    <Route path="/Profile" element={isAuthenticated ? (
                        <ProfileURLayout />
                    ) : (
                        <Navigate to="/Login" />
                    )} />
                    <Route path="/Partecipa" element={isAuthenticated ? (
                        <PartecipaLayout />
                    ) : (
                        <Navigate to="/Login" />
                    )} />
                    <Route path="/Feedback" element={isAuthenticated ? (
                        <FeedbackLayout />
                    ) : (
                        <Navigate to="/Login" />
                    )} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Provider>
    );
}

// Layout per il profilo utente
function ProfileURLayout() {
    return (
        <div>
            <NavBar />
            <ProfileUR />
        </div>
    );
}

// Layout per la partecipazione, accessibile solo se loggati
function PartecipaLayout() {
    return (
        <div>
            <NavBar />
            <Partecipa />
        </div>
    );
}

// Layout per il feedback, accessibile solo se loggati
function FeedbackLayout() {
    return (
        <div>
            <NavBar />
            <Feedback />
        </div>
    );
}

export default App;
