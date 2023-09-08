'use client'

import usePosts from '@/hooks/use-posts';
import PostsForm from '@/components/PostsForm';
import { login } from '@/services/login';
import { setToken } from '@/services/posts';
import { Post } from '@/types/Post';

import { PostsContext } from '@/context/postsContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Posts() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState<any>(null)
    const { data, isError, isLoading } = usePosts();
    const [posts, setPosts] = useState<Post[] | undefined | any>(data);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setToken(user.token)
        }
    }, [])

    const handleLogin = async (event: any) => {
        event.preventDefault()

        try {
            const user = await login({
                username,
                password,
            })
            window.localStorage.setItem(
                "loggedUser", JSON.stringify(user)
            )
            setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedUser")
        setUser(null)
    }

    if (isError) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
<>
      {user ? (
      <PostsContext.Provider value={{ posts, setPosts }}>
        <div className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center">
          <p>
            Welcome {user.name}! ({user.username})
          </p>
            <h2>Posts</h2>
            <ul className="rounded-lg border shadow-sm p-8">
            {posts?.map((post: Post) => (
                <li key={post.id}>{post.content}</li>
            ))}
            </ul>
            <PostsForm />
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleLogout}
        >
            Logout
        </button>
      </PostsContext.Provider>
            ) : (
              <>
                <form
                    className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center"
                    onSubmit={handleLogin}
                >
                    <h1>Login</h1>
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input
                            className="border rounded-lg p-2"
                            id="username"
                            name="username"
                            placeholder="Username"
                            required
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            className="border rounded-lg p-2"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            type="password"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <Link
                    href="/signup"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Signup
                </Link>
              </>
            )
          }
        </>
    )
}
