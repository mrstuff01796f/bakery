'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArchiveBoxIcon,
  ChatBubbleLeftRightIcon,
  ShoppingCartIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import {
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid';

export default function BottomNavigation() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigation = [
    {
      name: 'Холодильник',
      href: '/#fridge',
      icon: ArchiveBoxIcon,
      activeIcon: ArchiveBoxIconSolid,
      current: pathname === '/' && currentHash === '#fridge'
    },
    {
      name: 'Чат',
      href: '/#chat',
      icon: ChatBubbleLeftRightIcon,
      activeIcon: ChatBubbleLeftRightIconSolid,
      current: pathname === '/' && currentHash === '#chat'
    },
    {
      name: 'Магазин',
      href: '/#shop',
      icon: ShoppingCartIcon,
      activeIcon: ShoppingCartIconSolid,
      current: pathname === '/' && currentHash === '#shop'
    },
    {
      name: 'Избранное',
      href: '/#favorites',
      icon: HeartIcon,
      activeIcon: HeartIconSolid,
      current: pathname === '/' && currentHash === '#favorites'
    }
  ];

  const scrollToSection = (e: React.MouseEvent, hash: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setCurrentHash(hash);
      }
    }
  };

  return (
    <>
      <div className="h-20"></div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="mx-auto flex items-center justify-around px-2 py-2 max-w-md">
          {navigation.map((item) => {
            const Icon = item.current ? item.activeIcon : item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href.replace('/', ''))}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors ${
                  item.current
                    ? 'text-emerald-600'
                    : 'text-gray-500 hover:text-emerald-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium truncate max-w-full">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
