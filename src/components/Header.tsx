'use client';
import { useState, useEffect } from 'react';
import contentCache from '@/lib/contentCache';
import { useCartStore } from '@/lib/cartStore';
import { ShoppingCart } from 'lucide-react';

interface Settings {
  shopTitle: string;
  shopSubtitle: string;
  bannerText: string;
  titleEffect: string;
  scrollingText: string;
}

export default function Header() {
  const { getTotalItems, setIsOpen } = useCartStore();
  const totalItems = getTotalItems();
  
  // Forcer les données du cache instantané - JAMAIS d'ancien contenu
  // Header instantané depuis localStorage
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('adminSettings');
        if (cached) {
          const data = JSON.parse(cached);
          return {
            shopTitle: data.shopTitle || '',
            shopSubtitle: data.shopSubtitle || '',
            scrollingText: data.scrollingText || '',
            bannerText: data.bannerText || '',
            titleStyle: data.titleStyle || 'glow'
          };
        }
      } catch (e) {}
    }
    return {
      shopTitle: '',
      shopSubtitle: '',
      scrollingText: '',
      bannerText: '',
      titleStyle: 'glow'
    };
  });

  useEffect(() => {
    // Mise à jour en arrière-plan (pas prioritaire)
    setTimeout(() => {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          setSettings({
            shopTitle: data.shopTitle || '',
            shopSubtitle: data.shopSubtitle || '',
            scrollingText: data.scrollingText || '',
            bannerText: data.bannerText || '',
            titleStyle: data.titleStyle || 'glow'
          });
          // Maj cache local
          try {
            localStorage.setItem('adminSettings', JSON.stringify(data));
          } catch (e) {}
        })
        .catch(() => {});
    }, 100);
  }, []);

  // Effet de titre dynamique
  const getTitleClassName = () => {
    const baseClass = "text-2xl md:text-4xl font-bold text-center text-white uppercase tracking-wider";
    
    switch (settings.titleStyle) {
      case 'glow':
        return `${baseClass} animate-glow`;
      case 'gradient':
        return `${baseClass} bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent`;
      case 'neon':
        return `${baseClass} text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]`;
      case 'retro':
        return `${baseClass} text-yellow-400 [text-shadow:2px_2px_0px_#ff6b6b]`;
      default:
        return baseClass;
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-6 px-4 border-b border-white/10">
      {/* Titre et sous-titre */}
      <div className="max-w-7xl mx-auto relative">
        {/* Bouton panier en position absolue */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute right-0 top-0 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="bg-green-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        
        <h1 className={getTitleClassName()}>
          {settings.shopTitle || 'Chargement...'}
        </h1>
        {settings.shopSubtitle && (
          <p className="text-gray-400 text-center mt-2 text-sm md:text-base">
            {settings.shopSubtitle}
          </p>
        )}
      </div>

      {/* Texte défilant */}
      {settings.scrollingText && (
        <div className="mt-4 overflow-hidden">
          <div className="animate-scroll whitespace-nowrap">
            <span className="text-green-400 font-medium">
              {settings.scrollingText} • {settings.scrollingText} • {settings.scrollingText} •
            </span>
          </div>
        </div>
      )}

      {/* Bannière */}
      {settings.bannerText && (
        <div className="mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-2 px-4 rounded-lg font-medium">
          {settings.bannerText}
        </div>
      )}
    </header>
  );
}