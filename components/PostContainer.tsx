import { Post } from '@/types/Post';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function PostContainer({post}: {post: Post}) {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white/80 shadow-sm rounded-lg">
      <div className="flex gap-2 items-center">
        <div className="rounded-full w-10 h-10 grid place-content-center relative overflow-hidden">
          <Avatar>
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              <AvatarImage src={post.user.profile_pic} alt={post.user.name} />
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div className="font-medium">
            {post.user.name}
          </div>
          <div className="font-light">
            @{post.user.username}
          </div>
        </div>
      </div>
      <div className="flex">
        {post.content}
      </div>
      <div className="flex gap-4">
        <div>
          {post.likes}
        </div>
        <div>
          {post.comments ? post.comments.length : 0}
        </div>
      </div>
    </div>
  )
}
