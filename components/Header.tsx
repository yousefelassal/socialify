import { useContext } from "react"
import { UserContext } from "@/context/userContext"
import { Home, MessageCircle, Bell, Search, Users } from "lucide-react"

import ProfileDropdown from "./ProfileDropdown"
import Searchbar from "./Searchbar"

export default function Header() {
  const { user, handleLogout } = useContext<any>(UserContext)
  const headerMenu = [
    {
      name: 'Home',
      href: '/',
      icon: <Home className="h-5 w-5 text-blue-500" />
    },
    {
      name: 'Connections',
      href: '/connections',
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: <MessageCircle className="h-5 w-5 text-blue-500" />
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: <Bell className="h-5 w-5 text-blue-500" />
    }
  ]
  return (
    <div className="flex justify-between items-center fixed bg-white/80 top-0 inset-x-0 py-4 pb-2 px-12 backdrop-blur-sm z-50">
        <div className="flex items-center gap-8">
            <div className="flex gap-2 items-center relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 130 130" fill="none">
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
                <Searchbar />
            </div>
            <div className="flex gap-6">
                {headerMenu.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-sm">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex gap-2">
            <ProfileDropdown user={user} handleLogout={handleLogout} />
        </div>
    </div>
  )
}
