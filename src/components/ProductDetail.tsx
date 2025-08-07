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
  const [whatsappLink, setWhatsappLink] = useState('');
  const { addItem } = useCartStore();

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-2xl max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 max-h-[90vh] overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Bouton fermer - responsive */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors bg-gray-800/50 backdrop-blur-sm rounded-full p-2 z-10"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image ou vidéo - responsive */}
        <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden">
          {product.video ? (
            <video 
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src={product.video} type="video/mp4" />
            </video>
          ) : (
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
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

        {/* Liste des prix avec promotions */}
        <div className="bg-gray-900 border border-white/20 rounded-xl p-3 sm:p-4 lg:p-5 mb-4 sm:mb-6">
          <h3 className="text-responsive-lg font-bold mb-3 sm:mb-4 text-white flex items-center">
            <span className="mr-2">💰</span>
            Tarifs disponibles :
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {priceList.map(({ weight, originalPrice, finalPrice, discount }, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 sm:py-3 px-2 sm:px-3 bg-gray-800 border border-white/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-white text-responsive-sm">{weight}</span>
                  {discount > 0 && (
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">
                      PROMO -{discount}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    {discount > 0 && (
                      <span className="text-gray-500 line-through text-sm">{originalPrice}€</span>
                    )}
                    <span className="font-bold text-white text-responsive-lg block">{finalPrice.toFixed(2)}€</span>
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
            ))}
          </div>
        </div>

        {/* Bouton Commander WhatsApp */}
        <div className="mb-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] touch-manipulation relative z-50"
          >
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-responsive-sm sm:text-responsive-base">Commander via WhatsApp</span>
            </div>
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}