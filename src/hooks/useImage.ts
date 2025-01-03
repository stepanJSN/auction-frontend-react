import { useState, useCallback } from 'react';

export default function useImage() {
  const [image, setImage] = useState<{ url: string; image: Blob } | null>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage({ url: URL.createObjectURL(files[0]), image: files[0] });
    }
  }, []);

  const handleDelete = useCallback(() => {
    setImage(null);
  }, []);

  return { image, handleUpload, handleDelete };
}
