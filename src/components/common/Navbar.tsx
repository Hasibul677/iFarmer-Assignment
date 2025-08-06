'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const menuList = [
    { name: "Assignment 1", path: "/assignment-1" },
    { name: "Assignment 2", path: "/assignment-2" },
  ]

  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-info-600">
        <div className="flex justify-between h-20 items-center">
          <div className="flex space-x-2 md:space-x-6">
            {menuList?.map(menu => (
              <Link
                href={menu.path}
                key={menu.path}
                className={`inline-flex items-center text-blue-800 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${pathname.startsWith(menu.path)
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white hover:shadow-sm'
                  }`}
              >
                {menu.name}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}