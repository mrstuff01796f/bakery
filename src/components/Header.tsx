'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCartIcon, MapPinIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header() {
  const { getItemCount, getTotalPrice } = useCart();
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-orange-500">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Логотип */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍞</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Bakery
              </span>
            </Link>

            {/* Корзина */}
            <Link 
              href="/cart"
              className="relative flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span className="font-medium text-sm">
                {itemCount > 0 ? `${totalPrice} ₽` : 'Корзина'}
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Мобильное меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-200 px-4 py-4 space-y-3">
            <Link 
              href="/" 
              className="block w-full text-left py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Продукты
            </Link>
            <Link 
              href="/cart" 
              className="block w-full text-left py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              🛒 Корзина
            </Link>
            <div className="pt-2 border-t border-gray-200">
              <p className="px-4 py-2 text-sm text-gray-500">
                Свежие продукты по выгодным ценам
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Отступ для фиксированной шапки */}
      <div className="h-16"></div>
    </>
  );
}
