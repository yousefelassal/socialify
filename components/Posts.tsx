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
        <div className="flex gap-10 flex-col">
          <PostsForm />
          <ul className="rounded-lg border shadow-sm p-8">
          {posts?.map((post: Post) => (
              <li key={post.id}>{post.content}</li>
          ))}
          </ul>
        </div>
      </PostsContext.Provider>
    )
}
