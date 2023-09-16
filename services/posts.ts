import axios from 'axios'

import { Post } from '@/types/Post'

export const baseUrl = `http://localhost:3001/posts`

let token:any = null

export const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`
}

export const getPosts = async (): Promise<Post[]>=> {
    const response = await axios.get(baseUrl)
    return response.data
}

export const getPost = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const likePost = async (id: string) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${baseUrl}/${id}/like`, {}, config)
    return response.data
}

export const unlikePost = async (id: string) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${baseUrl}/${id}/unlike`, {}, config)
    return response.data
}

export const createPost = async (data: any) => {
    console.log(token)
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, data, config)
    return response.data
}

export const updatePost = async (id: string, data: any) => {
    const response = await axios.put(`${baseUrl}/${id}`, data)
    return response.data
}

export const deletePost = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

