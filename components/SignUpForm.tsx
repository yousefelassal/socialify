'use client'

import { signup } from "@/services/signup"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSignUp = async (event: any) => {
    event.preventDefault()

    try {
        await signup({
            username,
            password,
            name,
        })
        router.push("/")
    } catch (error) {
        console.error(error)
    }
    }
  return (
    <form
        className="mx-auto w-fit p-12 mt-6 shadow-md rounded-xl border grid place-content-center"
        onSubmit={handleSignUp}
    >
        <h1>Sign Up</h1>
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
        <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
                className="border rounded-lg p-2"
                id="name"
                name="name"
                placeholder="Name"
                required
                onChange={({ target }) => setName(target.value)}
                value={name}
            />
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            type="submit"
        >
            Sign Up
        </button>
    </form>
  )
}
