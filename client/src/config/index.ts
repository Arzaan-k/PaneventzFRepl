// Environment configuration
const config = {
  apiUrl: import.meta.env.VITE_API_URL || '/.netlify/functions',
  cloudinaryConfig: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dhxetyrkb',
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '878769551721862',
  },
  isProduction: import.meta.env.NODE_ENV === 'production',
};

export default config;
