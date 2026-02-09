'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-emerald-500">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🥗</span>
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Умный холодильник
                </span>
                <p className="text-xs text-gray-500">
                  Идеи блюд, покупки и избранные рецепты
                </p>
              </div>
            </Link>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <span>🍳</span>
              <span>Готовим из того, что уже есть</span>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16"></div>
    </>
  );
}
