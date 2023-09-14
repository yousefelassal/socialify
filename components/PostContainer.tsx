import { Post } from '@/types/Post';

export default function PostContainer({post}: {post: Post}) {
  return (
    <div>{post.content}</div>
  )
}
