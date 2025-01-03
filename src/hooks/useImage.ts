import { useState, useCallback, useEffect } from 'react';

export default function useImage(previousImageUrl?: string) {
  const [image, setImage] = useState<{ url: string; image?: Blob } | null>(
    null,
  );
  const [isImageError, setIsImageError] = useState(false);

  useEffect(() => {
    if (previousImageUrl) {
      setImage({ url: previousImageUrl });
    }
  }, [previousImageUrl]);

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
