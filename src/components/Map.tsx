'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const bakeryLocations = [
  {
    name: 'Пекарня "Солнечная"',
    coordinates: [37.6173, 55.7558], // Москва, ул. Ленина
    address: 'ул. Ленина, 15'
  },
  {
    name: 'Кафе "Уют"',
    coordinates: [37.6173, 55.7558], // Москва, пр. Мира
    address: 'пр. Мира, 42'
  },
  {
    name: 'Пекарня "Домашняя"',
    coordinates: [37.6173, 55.7558], // Москва, ул. Гагарина
    address: 'ул. Гагарина, 8'
  },
  {
    name: 'Пекарня "Вечерняя"',
    coordinates: [37.6173, 55.7558], // Москва, ул. Пушкина
    address: 'ул. Пушкина, 25'
  }
];

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // Инициализируем карту только один раз

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 22
            }
          ]
        },
        center: [37.6173, 55.7558], // Москва
        zoom: 12
      });

      // Добавляем маркеры пекарен
      bakeryLocations.forEach((bakery) => {
        // Создаем элемент маркера
        const markerElement = document.createElement('div');
        markerElement.className = 'bakery-marker';
        markerElement.innerHTML = `
          <div class="bg-orange-500 text-white p-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap">
            🍞 ${bakery.name}
          </div>
        `;

        // Добавляем маркер на карту
        new maplibregl.Marker(markerElement)
          .setLngLat(bakery.coordinates)
          .addTo(map.current!);

        // Добавляем всплывающую подсказку
        const popup = new maplibregl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-gray-800">${bakery.name}</h3>
              <p class="text-gray-600 text-sm">${bakery.address}</p>
            </div>
          `);

        markerElement.addEventListener('click', () => {
          popup.setLngLat(bakery.coordinates).addTo(map.current!);
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Стили для маркеров */}
      <style jsx global>{`
        .bakery-marker {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .bakery-marker:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
