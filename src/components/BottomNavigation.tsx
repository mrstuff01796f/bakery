'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { HomeIcon, ShoppingBagIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, ShoppingBagIcon as ShoppingBagIconSolid, MapPinIcon as MapPinIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    setCurrentHash(window.location.hash);
    
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigation = [
    {
      name: 'Продукты',
      href: '/',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      current: pathname === '/'
    },
    {
      name: 'Карта',
      href: '/#map',
      icon: MapPinIcon,
      activeIcon: MapPinIconSolid,
      current: pathname === '/' && currentHash === '#map'
    },
    {
      name: 'Корзина',
      href: '/cart',
      icon: ShoppingBagIcon,
      activeIcon: ShoppingBagIconSolid,
      current: pathname === '/cart',
      badge: itemCount > 0 ? itemCount : undefined
    },
    {
      name: 'Профиль',
      href: '/profile',
      icon: UserIcon,
      activeIcon: UserIconSolid,
      current: pathname === '/profile'
    }
  ];

  const scrollToMap = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      const mapElement = document.getElementById('map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentHash('#map');
      }
    }
  };

  return (
    <>
      {/* Отступ для нижней навигации */}
      <div className="h-20"></div>
      
      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around px-2 py-2">
          {navigation.map((item) => {
            const Icon = item.current ? item.activeIcon : item.icon;
            const isMapLink = item.href === '/#map';
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={isMapLink ? scrollToMap : undefined}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors ${
                  item.current
                    ? 'text-orange-600'
                    : 'text-gray-500 hover:text-orange-600'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
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
