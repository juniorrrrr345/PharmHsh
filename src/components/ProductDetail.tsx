'use client';
import { useEffect, useState } from 'react';
import { Product } from './ProductCard';
import { useCartStore } from '@/lib/cartStore';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (weight: string, price: number, originalPrice: number, discount: number) => {
    if (!product) return;
    
    addItem({
      productId: product._id,
      productName: product.name,
      farm: product.farm,
      image: product.image,
      weight,
      price,
      originalPrice,
      discount
    });
    
    toast.success(`${product.name} (${weight}) ajouté au panier !`);
  };

  if (!product) return null;

  // Créer une liste des prix avec promotions
  const priceList = Object.entries(product.prices || {})
    .filter(([, price]) => {
      return price !== undefined && 
             price !== null && 
             price !== 0 && 
             price !== '' && 
             !isNaN(Number(price)) && 
             Number(price) > 0;
    })
    .map(([weight, price]) => {
      const promo = product.promotions?.[weight as keyof typeof product.promotions] || 0;
      const originalPrice = Number(price);
      const finalPrice = promo > 0 ? originalPrice * (1 - promo / 100) : originalPrice;
      
      return {
        weight,
        originalPrice,
        finalPrice,
        discount: promo
      };
    })
    .sort((a, b) => {
      const weightA = parseInt(a.weight);
      const weightB = parseInt(b.weight);
      return weightA - weightB;
    });

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-0 overflow-hidden">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative bg-gray-900 w-full h-full max-w-2xl max-h-full overflow-hidden flex flex-col">
        {/* Header avec bouton fermer */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <button 
            onClick={onClose}
            className="ml-auto block text-white/80 hover:text-white bg-black/50 backdrop-blur-sm rounded-full p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Image ou vidéo - pleine largeur */}
          <div className="relative w-full aspect-square bg-black">
            {product.video ? (
              <video 
                className="w-full h-full object-contain"
                autoPlay 
                loop 
                muted 
                playsInline
                controls
              >
                <source src={product.video} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Infos produit */}
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                {product.name}
              </h2>
              <p className="text-gray-400 font-medium mt-1">{product.category}</p>
              <p className="text-gray-400 uppercase tracking-widest text-sm">
                {product.farm}
              </p>
            </div>
            
            {/* Description du produit */}
            {product.description && (
              <div className="p-4 bg-gray-800/50 rounded-lg border border-white/10">
                <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* Liste des prix - grille compacte */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <span className="mr-2">💰</span>
                Tarifs disponibles :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {priceList.map(({ weight, originalPrice, finalPrice, discount }, idx) => (
                  <div key={idx} className="bg-gray-800 border border-white/10 rounded-lg p-3 hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{weight}</span>
                        {discount > 0 && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold">
                            -{discount}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          {discount > 0 && (
                            <span className="text-gray-500 line-through text-xs block">{originalPrice}€</span>
                          )}
                          <span className="font-bold text-white text-lg">{finalPrice.toFixed(2)}€</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(weight, finalPrice, originalPrice, discount)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                          title="Ajouter au panier"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}