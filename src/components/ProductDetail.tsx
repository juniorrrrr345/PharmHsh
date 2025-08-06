'use client';
import { useEffect, useState } from 'react';
import { Product } from './ProductCard';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [whatsappLink, setWhatsappLink] = useState('');

  useEffect(() => {
    loadWhatsappLink();
  }, []);

  const loadWhatsappLink = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        // Compatibilité avec anciens liens Telegram
        const link = data.whatsappOrderLink || data.whatsappLink || 
                    data.telegramOrderLink || data.telegramLink || '';
        setWhatsappLink(link);
      }
    } catch (error) {
      console.error('Erreur chargement lien WhatsApp:', error);
    }
  };

  if (!product) return null;

  // Créer une liste des prix disponibles seulement (filtre les undefined/null/vides)
  const priceList = Object.entries(product.prices || {})
    .filter(([, price]) => {
      // Filtre plus strict pour éliminer toutes les valeurs invalides
      return price !== undefined && 
             price !== null && 
             price !== 0 && 
             price !== '' && 
             !isNaN(Number(price)) && 
             Number(price) > 0;
    })
    .map(([weight, price]) => ({
      weight,
      price: `${Number(price)}€`
    }))
    .sort((a, b) => {
      // Tri par ordre numérique des poids
      const aNum = parseFloat(a.weight.replace(/[^\d.]/g, ''));
      const bNum = parseFloat(b.weight.replace(/[^\d.]/g, ''));
      return aNum - bNum;
    });

  return (
    <div className="fixed inset-0 bg-black z-[10000] overflow-hidden">
      <div className="h-full overflow-y-auto overscroll-contain pb-20">
        {/* Header avec bouton retour - responsive */}
        <div className="sticky top-0 bg-black/95 backdrop-blur-sm p-3 sm:p-4 flex items-center justify-between border-b border-white/20 z-10">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors p-1 touch-manipulation"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-responsive-lg font-bold text-white">Détail Produit</h1>
        <div className="w-5 sm:w-6"></div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 max-w-4xl mx-auto">
        {/* Vidéo/Image - responsive */}
        <div className="relative mb-4 sm:mb-6 flex justify-center">
          {product.video ? (
            <div className="relative overflow-hidden rounded-xl shadow-2xl w-full max-w-lg">
              <video 
                controls 
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto aspect-video rounded-xl object-cover"
                poster={product.image}
              >
                <source src={product.video} type="video/mp4" />
                Ton navigateur ne supporte pas la lecture vidéo.
              </video>
              {/* Overlay gradient pour un meilleur contraste */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-xl"></div>
            </div>
          ) : (
            <div className="w-full max-w-lg">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full rounded-xl shadow-lg object-cover aspect-square"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
              />
            </div>
          )}
        </div>

        {/* Infos produit - responsive */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-responsive-xl sm:text-responsive-2xl md:text-responsive-3xl font-bold mb-2 uppercase tracking-wide text-white break-words">
            {product.name}
          </h2>
          <p className="text-gray-400 font-medium mb-1 text-responsive-sm">{product.category}</p>
          <p className="text-gray-400 uppercase tracking-widest text-responsive-xs sm:text-responsive-sm font-medium mb-3 break-words">
            {product.farm}
          </p>
          
          {/* Description du produit */}
          {product.description && (
            <div className="mt-4 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-white/10">
              <p className="text-white/90 text-responsive-sm sm:text-responsive-base leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}
        </div>

        {/* Liste des prix - responsive */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-3 sm:p-4 lg:p-5 mb-4 sm:mb-6">
          <h3 className="text-responsive-lg font-bold mb-3 sm:mb-4 text-white flex items-center">
            <span className="mr-2">💰</span>
            Tarifs disponibles :
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {priceList.map(({ weight, price }, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 sm:py-3 px-2 sm:px-3 bg-gray-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors">
                <span className="font-medium text-white text-responsive-sm">{weight}</span>
                <span className="font-bold text-white text-responsive-lg">{price}</span>
              </div>
            ))}
          </div>
        </div>


      </div>
      </div>
    </div>
  );
}