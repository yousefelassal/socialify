export default function PostsForm() {
  return (
    <form
        className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center"
        action="/api/posts"
        method="post"
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
