'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, ClockIcon, FingerPrintIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function SuccessPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 минут в секундах
  const [sliderValue, setSliderValue] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Таймер обратного отсчета
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Генерация случайного кода
  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setVerificationCode(code);
  };

  // Обработка завершения слайдера
  const handleSliderComplete = () => {
    if (sliderValue >= 100) {
      generateCode();
      setShowCode(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="px-4 space-y-6">
      {/* Заголовок успеха */}
      <div className="text-center space-y-4 pt-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircleIcon className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Оплата прошла успешно! 🎉
        </h1>
        <p className="text-base text-gray-600">
          Ваш заказ принят и готовится к выдаче
        </p>
      </div>

      {/* Таймер резерва */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <ClockIcon className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-orange-800">
            Резерв действует
          </h2>
        </div>
        
        {timeLeft > 0 ? (
          <div className="space-y-3">
            <div className="text-3xl font-bold text-orange-600">
              {formatTime(timeLeft)}
            </div>
            <p className="text-orange-700 text-sm text-center">
              У вас есть 15 минут, чтобы забрать заказ
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xl font-bold text-red-600">
              Время истекло
            </div>
            <p className="text-red-700 text-sm text-center">
              Резерв больше не действителен
            </p>
          </div>
        )}
      </div>

      {/* Слайдер верификации */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <FingerPrintIcon className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Верификация заказа
          </h2>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm text-center">
          Проведите пальцем по слайдеру для получения кода подтверждения
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              onMouseUp={handleSliderComplete}
              onTouchEnd={handleSliderComplete}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #f97316 ${sliderValue}%, #e5e7eb ${sliderValue}%)`
              }}
            />
            <div className="absolute top-4 left-0 right-0 text-center">
              <span className="text-sm text-gray-500">
                {sliderValue}%
              </span>
            </div>
          </div>

          {sliderValue >= 100 && !showCode && (
            <div className="text-green-600 font-medium text-center text-sm">
              ✅ Слайдер завершен! Нажмите еще раз для получения кода
            </div>
          )}
        </div>
      </div>

      {/* Код подтверждения */}
      {showCode && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <h3 className="text-base font-semibold text-blue-800 mb-4 text-center">
            🔐 Код подтверждения
          </h3>
          <div className="bg-white border-2 border-blue-300 rounded-xl p-4 mb-4">
            <div className="text-2xl font-mono font-bold text-blue-600 tracking-widest text-center">
              {verificationCode}
            </div>
          </div>
          <p className="text-blue-700 text-sm text-center">
            Покажите этот код при получении заказа в пекарне
          </p>
        </div>
      )}

      {/* Инструкции */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-4 text-center">
          📋 Что дальше?
        </h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </span>
            <p className="text-sm">Дождитесь уведомления о готовности заказа (обычно 5-10 минут)</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </span>
            <p className="text-sm">Придите в указанную пекарню в течение 15 минут</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </span>
            <p className="text-sm">Покажите код подтверждения и получите заказ</p>
          </div>
        </div>
      </div>

      {/* Кнопка возврата */}
      <div className="pt-4 pb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-md active:scale-95 w-full justify-center"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Вернуться к покупкам</span>
        </Link>
      </div>
    </div>
  );
}
