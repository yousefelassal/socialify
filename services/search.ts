import axios from "axios";

export const baseUrl = `http://localhost:3001/search`;

export const search = async (query: any) => {
    const response = await axios.get(`${baseUrl}?query=${query}`);
    return response.data;
}

export const getSearchHistory = async () => {
    const response = await axios.get(`${baseUrl}/history`);
    return response.data;
}

export const clearSearchHistory = async () => {
    const response = await axios.delete(`${baseUrl}/history`);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
}

export const getAllPosts = async () => {
    const response = await axios.get(`${baseUrl}/posts`);
    return response.data;
}
