'use client';

import { useState } from 'react';
import { Upload, Loader } from 'lucide-react';

interface DirectCloudinaryUploaderProps {
  onUploadComplete: (url: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function DirectCloudinaryUploader({ 
  onUploadComplete, 
  onError,
  className = '' 
}: DirectCloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress('Préparation upload...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'pharmhsh_upload');
      formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'df70ymn9g');
      
      // Déterminer le type de ressource
      const isVideo = file.type.startsWith('video/');
      formData.append('resource_type', isVideo ? 'video' : 'image');
      formData.append('folder', isVideo ? 'pharmhsh/videos' : 'pharmhsh/images');

      setProgress('Upload en cours...');

      // Upload direct vers Cloudinary (unsigned)
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'df70ymn9g'}/${isVideo ? 'video' : 'image'}/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur upload: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Upload direct réussi:', data.secure_url);
      
      onUploadComplete(data.secure_url);
      setProgress('');
    } catch (error) {
      console.error('❌ Erreur upload direct:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur upload inconnue';
      onError?.(errorMessage);
      setProgress('');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`direct-cloudinary-uploader ${className}`}>
      <label className="block">
        <div className={`
          border-2 border-dashed border-gray-600 rounded-lg p-6
          text-center cursor-pointer transition-all
          ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500'}
        `}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader className="w-8 h-8 animate-spin text-purple-500" />
              <span className="text-sm text-gray-400">{progress}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-8 h-8 text-gray-500" />
              <span className="text-sm text-gray-400">
                Upload direct Cloudinary (Unsigned)
              </span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}