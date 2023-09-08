import { createPost } from "@/services/posts"
import { PostsContext } from "@/context/postsContext"
import { useContext } from "react"
import { useState } from "react"

export default function PostsForm() {
  const [newPost, setNewPost] = useState("")
  const { setPosts } = useContext(PostsContext)
  const { posts } = useContext(PostsContext)

const addPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const postObject: { content: string } = {
        content: newPost.trim(),
    }
    try {
        await createPost(postObject)
        setNewPost("")
        const newArray: { content: string }[] = [postObject, ...posts]
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
        className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center"
        onSubmit={addPost}
    >
        <h1>Create Post</h1>
        <div className="flex flex-col">
            <label htmlFor="content">Content</label>
            <textarea
                className="border rounded-lg p-2"
                id="content"
                name="content"
                placeholder="What's on your mind?"
                required
                onChange={handleContentChange}
                value={newPost}
            />
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            type="submit"
        >
            Submit
        </button>
    </form>
  )
}
