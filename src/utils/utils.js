import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
const API = axios.create({ baseURL: API_BASE_URL });

function getToken() {
    const token = localStorage.getItem('access_token');
    return token;
}


function isTokenExpired(token) {
    if (!token) return true;
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
}

API.interceptors.request.use(async (config) => {
    if (!config.url.includes('/auth/')) {
        let token = getToken();
        if (token && isTokenExpired(token)) {
            token = await refreshToken();
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

async function refreshToken() {
    try {
        const refresh_token = localStorage.getItem('refresh_token');

        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refresh_token: refresh_token,
        });
        const { access_token: newAccessToken } = response.data;
        localStorage.setItem('access_token', newAccessToken); // Consider encrypting this
        API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}

// Additional utility functions as before...

// Utility Functions
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const clearAllStorages = async () => {
    localStorage.clear();
    sessionStorage.clear();
};

const storeDataInSession = (key, data) => {
    localStorage.setItem(key, data);
};

// API Functions
const deleteUpload = async (uploadId) => {
    try {
        await API.delete(`/files/delete-file/${uploadId}`);
    } catch (error) {
        console.error('Error deleting upload:', error);
    }
};

const getUserItems = async () => {
    try {
        const response = await API.get('/user/items');
        const data = await response.data
        return data;
    } catch (error) {
        console.error('Error fetching user items:', error);
    }
};

const getuserinfo = async () => {
    try {
        const response = await API.get('/user/info');
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

const getyearlyUsage = async () => {
    try {
        const response = await API.get('/user/get-yearly-usage');
        return response.data;
        // }
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};


 
export {
    API,
    API_BASE_URL,
    formatBytes,
    getUserItems,
    deleteUpload,
    getuserinfo,
    clearAllStorages,
    storeDataInSession,
    getyearlyUsage,
    isTokenExpired,
    getToken,
    useAuth,
};
