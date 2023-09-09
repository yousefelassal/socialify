'use client'

import { setToken } from '@/services/posts';
import { login } from '@/services/login';
import { UserContext } from '@/context/userContext';
import Header from './Header';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GetLayout({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState<any>(null)
    const pathname = usePathname()

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

    //TODO: Add logout shortcut
    // useEffect(() => {
    //     const logout = (e:KeyboardEvent) => {
    //       if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
    //         e.preventDefault()
    //         handleLogout()
    //       }
    //       document.addEventListener('keydown', logout)
    //       return () => document.removeEventListener('keydown', logout)
    //     }
    // }, [])

    if(pathname === '/signup') return <>{children}</>
    return (
        <>
        {user ? (
            <>
                <UserContext.Provider value={{ user, setUser, handleLogout }}>
                    <Header />
                    {children}
                </UserContext.Provider>
            </>
        ) : (
        <>
            <UserContext.Provider value={{ user, setUser, handleLogout }}>
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
            </UserContext.Provider>
        </>
        )}
        </>
    )
}
