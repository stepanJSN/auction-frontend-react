import { useState, useCallback } from 'react';

export default function useImage() {
  const [image, setImage] = useState<{ url: string; image: Blob } | null>(null);
  const [isImageError, setIsImageError] = useState(false);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setIsImageError(false);
      setImage({ url: URL.createObjectURL(files[0]), image: files[0] });
    }
  }, []);

  const handleDelete = useCallback(() => {
    setImage(null);
  }, []);

  return { image, handleUpload, handleDelete, isImageError, setIsImageError };
}
