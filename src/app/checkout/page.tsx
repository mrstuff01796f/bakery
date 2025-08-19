'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CreditCardIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const totalPrice = getTotalPrice();

  // Проверяем, есть ли товары в корзине
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Имитация процесса оплаты
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push('/success');
    }, 2000);
  };

  return (
    <div className="px-4 space-y-6">
      {/* Заголовок */}
      <div className="flex items-center space-x-3 pt-4">
        <Link
          href="/cart"
          className="text-gray-600 hover:text-gray-800 transition-colors p-2"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Оформление заказа</h1>
          <p className="text-gray-600 mt-1 text-sm">Заполните данные для оплаты</p>
        </div>
      </div>

      {/* Форма оплаты */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <CreditCardIcon className="w-5 h-5 mr-2 text-orange-500" />
          Данные для оплаты
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              ФИО *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              placeholder="Введите ваше полное имя"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Телефон *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-6 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Обработка платежа...</span>
              </div>
            ) : (
              `Оплатить ${totalPrice} ₽`
            )}
          </button>
        </form>
      </div>

      {/* Сводка заказа */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Сводка заказа</h2>
        
        <div className="space-y-3 mb-4">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🍞</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.bakery}</p>
                </div>
              </div>
              <span className="font-semibold text-gray-800">{item.price} ₽</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-lg font-bold text-gray-800">
            <span>Итого к оплате:</span>
            <span className="text-2xl text-orange-600">{totalPrice} ₽</span>
          </div>
        </div>
      </div>

      {/* Информация о заказе */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <h3 className="text-base font-semibold text-blue-800 mb-3">
          📋 Детали заказа
        </h3>
        <div className="text-blue-700 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Количество товаров:</span>
            <span className="font-medium">{items.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Пекарни:</span>
            <span className="font-medium">
              {Array.from(new Set(items.map(item => item.bakery))).length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Экономия:</span>
            <span className="font-medium text-green-600">
              {items.reduce((total, item) => total + (item.originalPrice - item.price), 0)} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Информация о безопасности */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <h3 className="text-base font-semibold text-green-800 mb-3 flex items-center">
          <CheckIcon className="w-5 h-5 mr-2" />
          Безопасная оплата
        </h3>
        <ul className="text-green-700 space-y-2 text-sm">
          <li>• Все платежи защищены SSL-шифрованием</li>
          <li>• Мы не храним данные ваших карт</li>
          <li>• Подтверждение придет на email</li>
        </ul>
      </div>

      {/* Отступ для нижней навигации */}
      <div className="h-6"></div>
    </div>
  );
}
