import axios from "axios";

export const baseUrl = `http://localhost:3001/login`;

export const login = async (data: any) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
}