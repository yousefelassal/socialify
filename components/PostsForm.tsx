import { createPost } from "@/services/posts"
import { PostsContext } from "@/context/postsContext"
import { UserContext } from "@/context/userContext"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { useState, useContext } from "react"

export default function PostsForm() {
  const [newPost, setNewPost] = useState("")
  const { setPosts } = useContext(PostsContext)
  const { posts } = useContext(PostsContext)
  const { user } = useContext<any>(UserContext)

const addPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const postObject: { content: string } = {
        content: newPost.trim(),
    }
    try {
        await createPost(postObject)
        setNewPost("")
        const newPost = {
            content: postObject.content,
            likes: 0,
            createdAt: new Date().toISOString(),
            user: {
                username: user.username,
                name: user.name,
                profile_pic: user.profile_pic,
            },
        }
        const newArray: { content: string }[] = [newPost, ...posts]
        setPosts(newArray)
    } catch (error) {
        console.error(error)
    }
}

  const handleContentChange = (event: any) => {
    setNewPost(event.target.value)
  }

  return (
    <form
        className="flex flex-col gap-2 bg-white/80 shadow-sm rounded-lg p-4 w-full"
        onSubmit={addPost}
    >
        <div className="flex items-center gap-2">
            <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                <AvatarImage src={user.profile_pic} alt={user.name} />
            </Avatar>
            <textarea
                className=" bg-gray-100/60 rounded-lg p-2 w-full focus:outline-none"
                id="content"
                name="content"
                placeholder="What's on your mind?"
                required
                onChange={handleContentChange}
                value={newPost}
            />
        </div>
        
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
        >
            Post
        </button>
    </form>
  )
}
