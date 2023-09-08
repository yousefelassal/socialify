'use client'

import usePosts from '@/hooks/use-posts';
import PostsForm from '@/components/PostsForm';
import { Post } from '@/types/Post';
import { PostsContext } from '@/context/postsContext';
import { UserContext } from '@/context/userContext';

import { useState, useContext } from 'react';

export default function Posts() {
    const { data, isError, isLoading } = usePosts();
    const [posts, setPosts] = useState<Post[] | undefined | any>(data);
    const { user, handleLogout } = useContext<any>(UserContext);

    if (isError) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
      <PostsContext.Provider value={{ posts, setPosts }}>
        <div className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center">
          <p>
            Welcome {user.name}! ({user.username})
          </p>
            <h2>Posts</h2>
            <ul className="rounded-lg border shadow-sm p-8">
            {posts?.map((post: Post) => (
                <li key={post.id}>{post.content}</li>
            ))}
            </ul>
            <PostsForm />
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleLogout}
        >
            Logout
        </button>
      </PostsContext.Provider>
    )
}
