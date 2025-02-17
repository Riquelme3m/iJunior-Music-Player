import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { checkLoginStatus } from "../services/api";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CurtidasPage from "../pages/LikesPage";
import Account from "../pages/Account";
import ArtistSongs from "../pages/ArtistsongsPage";


function AppRouter() {
    const isLoggedIn = checkLoginStatus()

    return (
        <Router>
            <Routes>
                // Login: caso ja estiver logado vai para /
                <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/signup/" element={!isLoggedIn ? <SignupPage /> : <Navigate to="/" />} />

                // Main: caso não estiver logado vai para /login
                <Route path="/" element={
                    isLoggedIn ? <MainPage /> : <Navigate to="/login" />
                } />

                // Likes: caso não estiver logado vai para /login
                <Route path="/likes" element={
                    isLoggedIn ? <CurtidasPage /> : <Navigate to="/login" />
                } />

                <Route path="/songs/:artistId" element={
                    isLoggedIn ? <ArtistSongs /> : <Navigate to="/login" />
                }/>

                // Account: caso não estiver logado vai para /login
                <Route path="/account" element={
                    isLoggedIn ? <Account /> : <Navigate to="/login" />
                } />

                // Pagina não definida: vai para /
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;