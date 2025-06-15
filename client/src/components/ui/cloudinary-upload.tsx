import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  label?: string;
  accept?: string;
}

export function CloudinaryUpload({ onUpload, currentImage, label = "Upload Image", accept = "image/*" }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // You can create a preset in Cloudinary
      formData.append('cloud_name', 'dhxetyrkb');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dhxetyrkb/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        setPreviewUrl(data.secure_url);
        onUpload(data.secure_url);
      } else {
        console.error('Upload failed:', data);
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlInput = (url: string) => {
    setPreviewUrl(url);
    onUpload(url);
  };

  const clearImage = () => {
    setPreviewUrl('');
    onUpload('');
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {previewUrl && (
        <div className="relative inline-block">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={clearImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            disabled={uploading}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="flex items-center space-x-1"
          >
            {uploading ? (
              <div className="animate-spin h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload'}</span>
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">Or enter image URL:</div>
        <Input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={previewUrl}
          onChange={(e) => handleUrlInput(e.target.value)}
        />
      </div>
    </div>
  );
}