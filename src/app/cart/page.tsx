'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { TrashIcon, ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBagIcon className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Корзина пуста</h2>
        <p className="text-gray-600 mb-8 text-sm">Добавьте продукты из нашего каталога</p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-md active:scale-95"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Перейти к покупкам</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Корзина</h1>
          <p className="text-gray-600 mt-1 text-sm">
            {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'} в корзине
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 font-medium transition-colors text-sm"
        >
          Очистить
        </button>
      </div>

      {/* Список товаров */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center space-x-3">
                {/* Изображение */}
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🍞</span>
                </div>

                {/* Информация о товаре */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 truncate">{item.bakery}</p>
                  <p className="text-gray-500 text-xs mt-1 truncate">{item.location}</p>
                </div>

                {/* Цена и кнопка удаления */}
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-orange-600">
                    {item.price} ₽
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {item.originalPrice} ₽
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 mt-1"
                    title="Удалить из корзины"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Итого и кнопка оплаты */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-800">Итого к оплате:</span>
          <span className="text-2xl font-bold text-orange-600">{totalPrice} ₽</span>
        </div>

        <div className="space-y-3">
          <Link
            href="/checkout"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-md active:scale-95 text-center block"
          >
            Перейти к оплате
          </Link>
          <Link
            href="/"
            className="w-full text-center py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium block"
          >
            Продолжить покупки
          </Link>
        </div>
      </div>

      {/* Информация о доставке */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <h3 className="text-base font-semibold text-blue-800 mb-3">
          ℹ️ Информация о заказе
        </h3>
        <ul className="text-blue-700 space-y-2 text-sm">
          <li>• Заказ будет готов к выдаче в течение 15 минут после оплаты</li>
          <li>• При получении покажите код подтверждения</li>
          <li>• Продукты выдаются в указанной пекарне</li>
          <li>• Резерв действует строго 15 минут</li>
        </ul>
      </div>

      {/* Отступ для нижней навигации */}
      <div className="h-6"></div>
    </div>
  );
}
