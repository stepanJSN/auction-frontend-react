import { renderHook, act } from '@testing-library/react';
import useImage from './useImage';
import { cleanup } from '@testing-library/react';

describe('useImage hook', () => {
  const mockImageUrl = 'https://example.com/image.jpg';
  afterEach(cleanup);

  it('should initialize with previousImageUrl', () => {
    const { result } = renderHook(() => useImage(mockImageUrl));

    expect(result.current.image).toEqual({
      url: mockImageUrl,
    });
  });

  it('should handle image upload', () => {
    const mockImageUrl = 'mockedUrl';
    const { result } = renderHook(() => useImage());
    global.URL.createObjectURL = jest
      .fn()
      .mockImplementation(() => mockImageUrl);
    const file = new File(['image'], 'test.jpg', {
      type: 'image/jpeg',
    });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    expect(result.current.image).toBeNull();

    act(() => {
      result.current.handleUpload(event);
    });

    expect(result.current.image?.image).toBe(file);
    expect(result.current.image?.url).toBe(mockImageUrl);
    expect(result.current.isImageError).toBe(false);
  });

  it('should delete image', () => {
    const { result } = renderHook(() => useImage(mockImageUrl));

    act(() => {
      result.current.handleDelete();
    });

    expect(result.current.image).toBeNull();
  });

  it('should set image error', () => {
    const { result } = renderHook(() => useImage());

    act(() => {
      result.current.setIsImageError(true);
    });

    expect(result.current.isImageError).toBe(true);
  });
});
