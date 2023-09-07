'use client'

import usePosts from '@/hooks/use-posts';

export default function Posts() {
    const { posts, isError, isLoading } = usePosts();
    if (isError) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
      <div className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center">
        <h1>Posts</h1>
        <ul className="rounded-lg border shadow-sm p-8">
          {posts?.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      </div>
    )
}
