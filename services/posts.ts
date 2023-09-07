import axios from 'axios'

import { Post } from '@/types/Post'

export const baseUrl = 'http://localhost:3000/posts'

export const getPosts = async (): Promise<Post[]>=> {
    const response = await axios.get(baseUrl)
    return response.data
}

export const getPost = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const createPost = async (data: any) => {
    const response = await axios.post(baseUrl, data)
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

