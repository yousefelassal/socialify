'use client'

import usePosts from '@/hooks/use-posts';
import PostsForm from '@/components/PostsForm';
import { Post } from '@/types/Post';
import { PostsContext } from '@/context/postsContext';
import { UserContext } from '@/context/userContext';
import PostContainer from './PostContainer';

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
          {posts?.map((post: Post) => (
              <PostContainer key={post.id} post={post} />
          ))}
        </div>
      </PostsContext.Provider>
    )
}
