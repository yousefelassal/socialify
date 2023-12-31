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
                <div className="mx-auto max-w-screen-xl h-full px-4 py-16 sm:px-6 lg:px-8">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3555FF] to-[#3C8EEE] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
                    </div>
                    <div className="mx-auto max-w-lg">
                        <div className="flex flex-col gap-2 justify-center items-center">

                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 130 130" fill="none">
                            <g clipPath="url(#clip0_17_11)">
                                <path d="M68.8518 13.7223V65.4815L57.0556 58.7407C36.1111 46.7037 23.1111 24.3148 23.1111 0H14.4445V59.2222C14.4445 78.4815 25.5185 96.2963 43.0926 104.722L69.0926 117.241V65.4815L80.8889 72.2222C101.833 84.2593 114.833 106.648 114.833 130.963H123.5V71.7407C123.5 52.4815 112.426 34.6667 94.8519 26.2407L68.8518 13.7223Z" fill="url(#paint0_linear_17_11)"/>
                            </g>
                            <defs>
                            <linearGradient id="paint0_linear_17_11" x1="37.3148" y1="18.0556" x2="121.574" y2="109.537" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#3555FF"/>
                                <stop offset="1" stopColor="#3C8EEE"/>
                            </linearGradient>
                            <clipPath id="clip0_17_11">
                                <rect width="130" height="130" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <h1 className="text-center text-2xl font-bold sm:text-3xl">
                            Join Socialify Today
                        </h1>

                        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
                            dolores deleniti inventore quaerat mollitia?
                        </p>

                    </div>
                        <form
                            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                            onSubmit={handleLogin}
                        >
                        <p className="text-center text-lg font-medium">Sign in to your account</p>

                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>

                            <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:"
                                id="username"
                                name="username"
                                placeholder="Username"
                                required
                                onChange={({ target }) => setUsername(target.value)}
                                value={username}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                                </svg>
                            </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                            <input
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                onChange={({ target }) => setPassword(target.value)}
                                value={password}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                                </svg>
                            </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account?&nbsp;
                            <Link className="underline" href="/signup">Sign up</Link>
                        </p>
                        </form>
                    </div>
                    </div>
            </UserContext.Provider>
        </>
        )}
        </>
    )
}
