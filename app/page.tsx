import usePosts from '@/hooks/use-posts';

export default function Home() {
  const { posts, isError, isLoading } = usePosts();
  if (isError) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  )
}
