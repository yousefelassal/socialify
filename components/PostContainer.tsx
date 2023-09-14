import { Post } from '@/types/Post';

export default function PostContainer({post}: {post: Post}) {
  return (
    <div className="p-4 border flex flex-col rounded-lg">
      <div className="flex">
        {post.content}
      </div>
      <div className="flex gap-4">
        <div>
          {post.likes}
        </div>
        <div>
          {post.comments.length}
        </div>
      </div>
    </div>
  )
}
