// src/authService.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import for default export
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [nama, setNama] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5001/token');
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setNama(decode.name);
            setUserId(decode.userId);
            setExpire(decode.exp);
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    };

    const isLoggedIn = () => {
        return token && new Date().getTime() < expire * 1000;
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5001/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setNama(decode.name);
            setUserId(decode.userId);
            setExpire(decode.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return {
        nama,
        userId,
        token,
        axiosJWT,
        refreshToken,
        isLoggedIn, // add this
    };
};

export default useAuth;
