'use client'

import { createUser } from "@/services/user"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function SignUpForm() {
  // TODO: add zod schemas
  // TODO: add form validation
  // TODO: use react forms
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSignUp = async (event: any) => {
    event.preventDefault()

    try {
        await createUser({
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
    <>
    <section className="bg-white">
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside
        className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <Image
          alt="Pattern"
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      </aside>
  
      <main
        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div className="max-w-xl lg:max-w-3xl">
          <Link className="block text-blue-600" href="/">
            <span className="sr-only">Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10" viewBox="0 0 130 130" fill="none">
              <g clipPath="url(#clip0_17_11)">
                  <path d="M68.8518 13.7223V65.4815L57.0556 58.7407C36.1111 46.7037 23.1111 24.3148 23.1111 0H14.4445V59.2222C14.4445 78.4815 25.5185 96.2963 43.0926 104.722L69.0926 117.241V65.4815L80.8889 72.2222C101.833 84.2593 114.833 106.648 114.833 130.963H123.5V71.7407C123.5 52.4815 112.426 34.6667 94.8519 26.2407L68.8518 13.7223Z" fill="url(#paint0_linear_17_11)"/>
              </g>
              <defs>
              <linearGradient id="paint0_linear_17_11" x1="37.3148" y1="18.0556" x2="121.574" y2="109.537" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3555FF"/>
                  <stop offset="1" stop-color="#3C8EEE"/>
              </linearGradient>
              <clipPath id="clip0_17_11">
                  <rect width="130" height="130" fill="white"/>
              </clipPath>
              </defs>
          </svg>
          </Link>
  
          <h1
            className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            Welcome to Socialify
          </h1>
  
          <p className="mt-4 leading-relaxed text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
            dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
  
          <form
            className="mt-8 grid grid-cols-6 gap-6"
            onSubmit={handleSignUp}
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
  
              <input
                type="text"
                id="FullName"
                name="full_name"
                className="mt-1 w-full rounded-md border border-gray-200 p-3 bg-white text-sm text-gray-700 shadow-sm"
                required
                onChange={({ target }) => setName(target.value)}
                value={name}
              />
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
  
              <input
                type="text"
                id="Username"
                name="username"
                className="mt-1 w-full rounded-md border-gray-200 border p-3 bg-white text-sm text-gray-700 shadow-sm"
                required
                onChange={({ target }) => setUsername(target.value)}
                value={username}
              />
            </div>
  
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
  
              <input
                type="password"
                id="Password"
                name="password"
                className="mt-1 w-full rounded-md border-gray-200 focus:border-blue-500 p-3 border bg-white text-sm text-gray-700 shadow-sm"
                required
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
            </div>
  
            {/* <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>
  
              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div> */}
  
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                type="submit"
              >
                Create an account
              </button>
  
              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?&nbsp;
                <Link href="/" className="text-gray-700 underline">Log in</Link>.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
  </>
  )
}
