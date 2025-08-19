'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCart } from '@/context/CartContext';
import { Product } from '@/context/CartContext';
import { ClockIcon, MapPinIcon, StarIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Динамический импорт карты для избежания проблем с SSR
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

// Моковые данные продуктов
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Набор "Утренняя свежесть"',
    description: 'Свежий хлеб, круассаны и печенье. Идеально для завтрака!',
    price: 299,
    originalPrice: 599,
    bakery: 'Пекарня "Солнечная"',
    location: 'ул. Ленина, 15',
    expiresAt: '2024-01-20T18:00:00',
    image: '/api/placeholder/300/200',
    category: 'Наборы'
  },
  {
    id: '2',
    name: 'Набор "Сладкая жизнь"',
    description: 'Пирожные, торты и сладкая выпечка. Для сладкоежек!',
    price: 399,
    originalPrice: 799,
    bakery: 'Кафе "Уют"',
    location: 'пр. Мира, 42',
    expiresAt: '2024-01-20T19:00:00',
    image: '/api/placeholder/300/200',
    category: 'Наборы'
  },
  {
    id: '3',
    name: 'Набор "Домашний"',
    description: 'Хлеб, булочки и пирожки. Как у бабушки!',
    price: 199,
    originalPrice: 449,
    bakery: 'Пекарня "Домашняя"',
    location: 'ул. Гагарина, 8',
    expiresAt: '2024-01-20T17:30:00',
    image: '/api/placeholder/300/200',
    category: 'Наборы'
  },
  {
    id: '4',
    name: 'Набор "Вечерний"',
    description: 'Вечерняя выпечка и десерты. Завершите день вкусно!',
    price: 349,
    originalPrice: 699,
    bakery: 'Пекарня "Вечерняя"',
    location: 'ул. Пушкина, 25',
    expiresAt: '2024-01-20T20:00:00',
    image: '/api/placeholder/300/200',
    category: 'Наборы'
  }
];

export default function HomePage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Все', 'Наборы', 'Хлеб', 'Сладости', 'Пирожки'];

  const filteredProducts = selectedCategory === 'Все' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const formatTimeLeft = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Истек';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}ч ${minutes}м`;
    return `${minutes}м`;
  };

  return (
    <div className="space-y-6 px-4">
      {/* Заголовок */}
      <div className="text-center space-y-3 pt-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Свежие продукты по выгодным ценам
        </h1>
        <p className="text-base text-gray-600">
          Покупайте качественные продукты с заканчивающимся сроком годности 
          из лучших пекарен города
        </p>
      </div>

      {/* Карта */}
      <div id="map" className="bg-white rounded-2xl shadow-lg p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <MapPinIcon className="w-5 h-5 mr-2 text-orange-500" />
          Карта пекарен
        </h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <Map />
        </div>
      </div>

      {/* Фильтры */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Фильтры</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
          >
            <FunnelIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              {showFilters ? 'Скрыть' : 'Показать'}
            </span>
          </button>
        </div>
        
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Список продуктов */}
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Изображение продукта */}
            <div className="h-32 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍞</span>
              </div>
              {/* Скидка */}
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            </div>

            {/* Информация о продукте */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              </div>

              {/* Пекарня и время */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <StarIcon className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="truncate">{product.bakery}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="truncate">{product.location}</span>
                </div>
                <div className="flex items-center text-sm text-red-600 font-medium">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Осталось: {formatTimeLeft(product.expiresAt)}
                </div>
              </div>

              {/* Цены и кнопка */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-xl font-bold text-orange-600">
                    {product.price} ₽
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {product.originalPrice} ₽
                  </div>
                </div>
                <button
                  onClick={() => addItem(product)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-md active:scale-95"
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Отступ для нижней навигации */}
      <div className="h-6"></div>
    </div>
  );
}
