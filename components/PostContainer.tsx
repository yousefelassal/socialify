'use client'

import { useState, useContext, useEffect } from 'react';

import { Post } from '@/types/Post';
import { likePost } from '@/services/posts';
import { unlikePost } from '@/services/posts';
import { UserContext } from "@/context/userContext"

import { AiFillHeart } from 'react-icons/ai'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function PostContainer({post}: {post: Post}) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const { user } = useContext<any>(UserContext)


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
