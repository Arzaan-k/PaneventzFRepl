export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dhxetyrkb',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '878769551721862',
  baseURL: `https://res.cloudinary.com/dhxetyrkb`
};

export const getCloudinaryUrl = (publicId: string, transformations: string = '') => {
  return `${cloudinaryConfig.baseURL}/image/upload${transformations ? '/' + transformations : ''}/${publicId}`;
};
