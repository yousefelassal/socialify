'use client'

import usePosts from '@/hooks/use-posts';
import PostsForm from '@/components/PostsForm';
import { PostsContext } from '@/context/postsContext';
import { useState } from 'react';

export default function Posts() {
    const { data, isError, isLoading } = usePosts();
    const [posts, setPosts] = useState<any>(data || []);

    if (isError) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
      <PostsContext.Provider value={{ posts, setPosts }}>
        <div className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center">
            <h1>Posts</h1>
            <ul className="rounded-lg border shadow-sm p-8">
            {data?.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
            </ul>
            <PostsForm />
        </div>
      </PostsContext.Provider>
    )
}
