'use client'

import { usePathname } from "next/navigation"
import { Home as HomeIcon, MessageCircle, Bell, Users } from "lucide-react"
import Link from "next/link"

export default function Nav() {
    const pathname = usePathname()
    const headerMenu = [
        {
          name: 'Home',
          href: '/',
          icon: <HomeIcon className="h-5 w-5" />,
          active: pathname === '/'
        },
        {
          name: 'Connections',
          href: '/connections',
          icon: <Users className="h-5 w-5" />,
          active: pathname === '/connections'
        },
        {
          name: 'Messages',
          href: '/messages',
          icon: <MessageCircle className="h-5 w-5" />,
          active: pathname === '/messages'
        },
        {
          name: 'Notifications',
          href: '/notifications',
          icon: <Bell className="h-5 w-5" />,
          active: pathname === '/notifications'
        }
      ]
    return (
        <div className="flex flex-col sticky top-24 gap-6">
            {headerMenu.map((item, index) => (
                <Link href={item.href} key={index} className={`flex w-fit items-center transition-colors gap-2 ${item.active ? 'text-blue-500' : 'text-gray-400 hover:text-blue-300'}`}>
                    {item.icon}
                    <span className="text-sm">
                        {item.name}
                    </span>
                </Link>
            ))}
        </div>
    )
}
