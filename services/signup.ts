import axios from "axios";

export const baseUrl = `http://localhost:3001/users`;

export const signup = async (data: any) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
}