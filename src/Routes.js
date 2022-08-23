import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import BrowseGames from './pages/Discover/BrowseGames';
import GameDetails from './pages/GameDetails';
import MyGames from './pages/MyGames/MyGames';
import Addgame from './pages/retailer/Addgame';
import MyStore from './pages/retailer/MyStore';

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route exact path={'/'} element={<BrowseGames />}></Route>
                    <Route exact path={'/login'} element={<Login />}></Route>
                    <Route exact path={'/register'} element={<Register />}></Route>

                    {/* Retailer */}
                    <Route exact path={'/add-game'} element={<Addgame />}></Route>
                    <Route exact path={'/my-store'} element={<MyStore />}></Route>

                    {/* Games */}
                    <Route exact path={'/game-details/:id/:gameId'} element={<GameDetails />}></Route>
                    <Route exact path={'/my-games'} element={<MyGames />}></Route>


                </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}

export default PageRoutes