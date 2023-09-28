'use client'

import { useState, useContext, useEffect } from 'react';

import { Post } from '@/types/Post';
import { likePost } from '@/services/posts';
import { unlikePost } from '@/services/posts';
import { deletePost } from '@/services/posts';
import { UserContext } from "@/context/userContext"
import { PostsContext } from "@/context/postsContext"

import { AiFillHeart } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PostContainer({post}: {post: Post}) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const { user } = useContext<any>(UserContext)
  const { posts } = useContext(PostsContext)
  const { setPosts } = useContext(PostsContext)

  const postByCurrentUser = post.user.id === user.id

  useEffect(() => {
    // TODO: Check if user has liked the post
    () => {
      if (post.likes > 0) {
        post.liked_by.forEach((LikedUser) => {
          if (LikedUser.id === user.id) {
            setLiked(true)
          }
        })
      }
    }
  }, [post, user])


  const handleLike = async () => {
    try {
      await likePost(post.id)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnlike = async () => {
    try {
      await unlikePost(post.id)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="p-4 flex flex-col gap-4 bg-white/80 shadow-sm rounded-lg">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center w-full">
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
        <div>
          {postByCurrentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <FiMoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span className="flex gap-2 items-center">
                      <Pencil className="h-4 w-4" />
                      <span>Edit</span>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await deletePost(post.id)
                      const newArray: { content: string }[] = posts.filter((Post:Post) => Post.id !== post.id)
                      setPosts(newArray)
                    }}
                  >
                    <span className="flex gap-2 items-center">
                      <Trash2 className="h-4 w-4" />
                      <span className="text-red-500 font-semibold">Delete</span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="flex max-w-[50ch] break-words overflow-y-auto">
        {post.content}
      </div>
      <div className="flex gap-4 items-center">
        <div>
          {liked ? (
            <button
              className="flex gap-1 items-center"
              onClick={() => {
                setLiked(false)
                setLikes(likes - 1)
                handleUnlike()
              }}
            >
              <AiFillHeart className="text-red-500 h-6 w-6 transition-colors" />
              <span>{likes}</span>
            </button>
          ) : (
            <button
              className="flex gap-1 items-center group"
              onClick={() => {
                setLiked(true)
                setLikes(likes + 1)
                handleLike()
              }}
            >
              <AiFillHeart className="text-gray-400 group-hover:text-red-400 h-6 w-6 transition-colors" />
              <span>{likes}</span>
            </button>
          )}
        </div>
        <div>
          {post.comments ? post.comments.length : 0}
        </div>
      </div>
    </div>
  )
}
