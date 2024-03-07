import axios from 'axios';

const http = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/`
});

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return http.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// Export both http and uploadFile
export default http;
