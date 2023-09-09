import axios from "axios";

export const baseUrl = `http://localhost:3001/users`;

export const createUser = async (data: any) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
}

export const getUsers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export const getUserById = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}