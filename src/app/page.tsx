'use client';

import { useMemo, useState } from 'react';
import {
  ArchiveBoxIcon,
  ChatBubbleLeftRightIcon,
  ShoppingCartIcon,
  HeartIcon,
  SparklesIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

const today = new Date();

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

type FridgeItem = {
  id: string;
  name: string;
  quantity: string;
  autoExpiresAt: string;
  manualExpiresAt?: string;
  category: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type ShoppingItem = {
  id: string;
  title: string;
  note: string;
};

type FavoriteRecipe = {
  id: string;
  title: string;
  ingredients: string;
  notes: string;
};

const initialFridgeItems: FridgeItem[] = [
  {
    id: '1',
    name: 'Куриное филе',
    quantity: '400 г',
    autoExpiresAt: addDays(today, 2).toISOString(),
    category: 'Белки'
  },
  {
    id: '2',
    name: 'Брокколи',
    quantity: '1 кочан',
    autoExpiresAt: addDays(today, 4).toISOString(),
    category: 'Овощи'
  },
  {
    id: '3',
    name: 'Рис жасмин',
    quantity: '300 г',
    autoExpiresAt: addDays(today, 60).toISOString(),
    category: 'Крупы'
  },
  {
    id: '4',
    name: 'Сливки 20%',
    quantity: '250 мл',
    autoExpiresAt: addDays(today, 5).toISOString(),
    category: 'Молочное'
  }
];

const preferenceOptions = [
  'Нежный вкус',
  'Пряное',
  'Сытное мясное',
  'Легкое овощное',
  'Суп',
  'Салат'
];

const recipeSuggestions = [
  {
    label: 'Нежный вкус',
    ideas: ['Крем-суп из брокколи со сливками', 'Паста с нежным сливочным соусом']
  },
  {
    label: 'Пряное',
    ideas: ['Томатное рагу с копченой паприкой', 'Пряный рис с овощами']
  },
  {
    label: 'Сытное мясное',
    ideas: ['Курица в сливочном соусе с рисом', 'Запеченное филе с пряными травами']
  },
  {
    label: 'Легкое овощное',
    ideas: ['Теплый салат с брокколи', 'Овощная тарелка с дипом']
  },
  {
    label: 'Суп',
    ideas: ['Суп-пюре из брокколи', 'Куриный бульон с рисом']
  },
  {
    label: 'Салат',
    ideas: ['Салат с курицей и легкой заправкой', 'Салат из свежих овощей']
  }
];

export default function HomePage() {
  const [fridgeItems, setFridgeItems] = useState(initialFridgeItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemShelfLife, setNewItemShelfLife] = useState(3);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Привет! Я помогу подобрать блюдо строго из того, что есть в холодильнике.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [shoppingTitle, setShoppingTitle] = useState('');
  const [shoppingNote, setShoppingNote] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['Суп']);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([
    {
      id: 'fav-1',
      title: 'Курица в сливочном соусе',
      ingredients: 'Куриное филе, сливки, чеснок, травы, соль',
      notes: 'Добавить больше тимьяна и щепотку мускатного ореха.'
    },
    {
      id: 'fav-2',
      title: 'Теплый салат с брокколи',
      ingredients: 'Брокколи, лимон, оливковое масло, семена кунжута',
      notes: 'В следующий раз добавить хлопья чили.'
    }
  ]);

  const fridgeProductsList = useMemo(
    () => fridgeItems.map((item) => item.name).join(', '),
    [fridgeItems]
  );

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short'
    });

  const getDaysLeft = (isoDate: string) => {
    const diff = new Date(isoDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleManualExpiry = (id: string, value: string) => {
    setFridgeItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              manualExpiresAt: value ? new Date(value).toISOString() : undefined
            }
          : item
      )
    );
  };

  const handleResetExpiry = (id: string) => {
    setFridgeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, manualExpiresAt: undefined } : item))
    );
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const created = addDays(new Date(), newItemShelfLife).toISOString();
    setFridgeItems((prev) => [
      {
        id: `${Date.now()}`,
        name: newItemName.trim(),
        quantity: newItemQuantity.trim() || '1 шт',
        autoExpiresAt: created,
        category: 'Новое'
      },
      ...prev
    ]);
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemShelfLife(3);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: chatInput.trim()
    };

    const suggestions = fridgeItems
      .slice(0, 3)
      .map((item) => `• ${item.name}`)
      .join('\n');

    const assistantMessage: Message = {
      id: `${Date.now()}-assistant`,
      role: 'assistant',
      text: `Использую только продукты из холодильника: ${fridgeProductsList}.

Предлагаю такие варианты:
${suggestions}

Если хочешь, напиши формат блюда: суп, салат или горячее.`
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setChatInput('');
  };

  const handleAddShoppingItem = () => {
    if (!shoppingTitle.trim()) return;
    setShoppingItems((prev) => [
      {
        id: `${Date.now()}`,
        title: shoppingTitle.trim(),
        note: shoppingNote.trim()
      },
      ...prev
    ]);
    setShoppingTitle('');
    setShoppingNote('');
  };

  const togglePreference = (preference: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };

  const currentSuggestions = recipeSuggestions.filter((suggestion) =>
    selectedPreferences.includes(suggestion.label)
  );

  const updateFavoriteRecipe = (id: string, changes: Partial<FavoriteRecipe>) => {
    setFavoriteRecipes((prev) =>
      prev.map((recipe) => (recipe.id === id ? { ...recipe, ...changes } : recipe))
    );
  };

  return (
    <div className="space-y-10 px-4 pb-4">
      <section className="pt-4 text-center space-y-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Планируйте блюда из того, что уже есть дома
        </h1>
        <p className="text-base text-gray-600">
          Холодильник хранит продукты и срок годности, чат помогает придумать блюда, а магазин —
          собрать список покупок и идей.
        </p>
      </section>

      <section id="fridge" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <ArchiveBoxIcon className="w-5 h-5 mr-2 text-emerald-500" />
              Холодильник
            </h2>
            <p className="text-sm text-gray-500">Автоматический срок годности можно заменить вручную.</p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            {fridgeItems.length} позиции
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              value={newItemName}
              onChange={(event) => setNewItemName(event.target.value)}
              placeholder="Продукт"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              value={newItemQuantity}
              onChange={(event) => setNewItemQuantity(event.target.value)}
              placeholder="Количество"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={newItemShelfLife}
                onChange={(event) => setNewItemShelfLife(Number(event.target.value))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-20"
              />
              <span className="text-xs text-gray-500">дней</span>
              <button
                onClick={handleAddItem}
                className="ml-auto bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-600 transition"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {fridgeItems.map((item) => {
            const activeExpiry = item.manualExpiresAt ?? item.autoExpiresAt;
            const daysLeft = getDaysLeft(activeExpiry);
            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.quantity} • {item.category}</p>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                    Осталось {daysLeft} дн.
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 items-end">
                  <div className="text-xs text-gray-500">
                    Авто срок: <span className="font-medium text-gray-700">{formatDate(item.autoExpiresAt)}</span>
                  </div>
                  <label className="text-xs text-gray-500 flex flex-col">
                    Вручную
                    <input
                      type="date"
                      value={item.manualExpiresAt ? item.manualExpiresAt.split('T')[0] : ''}
                      onChange={(event) => handleManualExpiry(item.id, event.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                  </label>
                  <button
                    onClick={() => handleResetExpiry(item.id)}
                    className="text-xs text-emerald-600 hover:text-emerald-700 text-left"
                  >
                    Сбросить на авто
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="chat" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-emerald-500" />
            Чат с помощником
          </h2>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Только продукты из холодильника</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                  message.role === 'user'
                    ? 'bg-emerald-500 text-white ml-auto'
                    : 'bg-emerald-50 text-gray-700'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Спроси: что приготовить на ужин?"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1"
            />
            <button
              onClick={handleSendMessage}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition"
            >
              Отправить
            </button>
          </div>
        </div>
      </section>

      <section id="shop" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <ShoppingCartIcon className="w-5 h-5 mr-2 text-emerald-500" />
            Магазин
          </h2>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Список покупок</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              value={shoppingTitle}
              onChange={(event) => setShoppingTitle(event.target.value)}
              placeholder="Что нужно купить"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              value={shoppingNote}
              onChange={(event) => setShoppingNote(event.target.value)}
              placeholder="Комментарий: для салата, для супа"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={handleAddShoppingItem}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition"
            >
              В список
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map((option) => (
              <button
                key={option}
                onClick={() => togglePreference(option)}
                className={`px-3 py-2 rounded-full text-xs font-medium border transition ${
                  selectedPreferences.includes(option)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Список покупок</h3>
            {shoppingItems.length === 0 ? (
              <p className="text-xs text-gray-500">Пока ничего не добавлено.</p>
            ) : (
              <ul className="space-y-2">
                {shoppingItems.map((item) => (
                  <li key={item.id} className="text-sm text-gray-700">
                    <span className="font-medium">{item.title}</span>
                    {item.note && <span className="text-xs text-gray-500"> — {item.note}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <SparklesIcon className="w-4 h-4 mr-2 text-emerald-500" />
              Идеи по вашим вкусам
            </h3>
            {currentSuggestions.length === 0 ? (
              <p className="text-xs text-gray-500">Выберите предпочтения, чтобы получить подсказки.</p>
            ) : (
              <div className="space-y-3">
                {currentSuggestions.map((suggestion) => (
                  <div key={suggestion.label}>
                    <p className="text-xs font-semibold text-gray-600">{suggestion.label}</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      {suggestion.ideas.map((idea) => (
                        <li key={idea}>{idea}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="favorites" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <HeartIcon className="w-5 h-5 mr-2 text-emerald-500" />
            Избранные рецепты
          </h2>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            Можно редактировать
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{recipe.title}</h3>
                  <p className="text-xs text-gray-500">Ингредиенты</p>
                </div>
                <PencilSquareIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <textarea
                value={recipe.ingredients}
                onChange={(event) => updateFavoriteRecipe(recipe.id, { ingredients: event.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                rows={3}
              />
              <div>
                <p className="text-xs text-gray-500">Правки и специи</p>
                <textarea
                  value={recipe.notes}
                  onChange={(event) => updateFavoriteRecipe(recipe.id, { notes: event.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
