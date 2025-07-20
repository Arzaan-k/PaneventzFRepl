import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileUpload: (filePath: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUploader = ({ 
  onFileUpload, 
  accept = "image/*,video/*", 
  maxSize = 10, 
  className = "" 
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const fileType = file.type.split('/')[0];
    if (!accept.includes(fileType) && !accept.includes('*')) {
      toast({
        title: "Invalid file type",
        description: `Please upload a file of type: ${accept}`,
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size should not exceed ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Upload file
    uploadFile(file);
    
    // Clean up
    return () => URL.revokeObjectURL(objectUrl);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Get the admin token for authorization
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // Simulate progress (in a real app, you might use XHR to track actual progress)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      setUploadProgress(100);
      
      // Pass the file path back to the parent component
      onFileUpload(data.filePath);
      
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded successfully.",
      });
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive",
      });
    } finally {
      // Reset the uploader after a short delay to show the completion status
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {previewUrl && !isUploading ? (
        <div className="relative mb-4">
          {previewUrl.includes('video') ? (
            <video 
              src={previewUrl} 
              className="w-full h-48 object-cover rounded-lg" 
              controls
            />
          ) : (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          )}
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
            onClick={() => {
              setPreviewUrl(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-neutral-300 hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileInput}
          />
          
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-neutral-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            
            <div className="text-sm text-neutral-600">
              <span className="font-medium text-primary">Click to upload</span> or drag and drop
            </div>
            
            <p className="text-xs text-neutral-500">
              {accept.replace('*', '')} (Max size: {maxSize}MB)
            </p>
          </div>
        </div>
      )}
      
      {isUploading && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;