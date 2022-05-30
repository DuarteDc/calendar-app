import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { startChecking } from '../actions/authActions';

import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import LoadingScreen from '../components/ui/LoadingScreen';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter = () => {

    const { checking, id } = useSelector(state => state.auth);

    const dispacth = useDispatch();

    useEffect(() => {
        dispacth(startChecking());
    }, [dispacth])

    if (checking) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoutes
                        isAuthenticated={!id}
                    >
                        <LoginScreen />
                    </PublicRoutes>}
                />
                <Route path="/login" element={<LoginScreen />} />

                <Route path="/*" element={
                    <PrivateRoutes
                        isAuthenticated={!!id}
                    >
                        <CalendarScreen />
                    </PrivateRoutes>
                }
                />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter