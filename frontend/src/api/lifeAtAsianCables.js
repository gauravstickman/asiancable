import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getLifeAtAsianCablesSettings = async () => {
    const response = await axios.get(`${API_URL}/life-at-asian-cables`, {
        withCredentials: true
    });
    return response.data;
};

export const updateLifeAtAsianCablesSettings = async (data) => {
    const response = await axios.put(`${API_URL}/life-at-asian-cables`, data, {
        withCredentials: true
    });
    return response.data;
};
