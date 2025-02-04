import { useDispatch } from 'react-redux';
import useMutation from '../../hooks/useMutation';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { afterEach } from 'node:test';
import { act, cleanup, renderHook } from '@testing-library/react';
import { Gender } from '../../enums/gender.enum';
import { getCards } from './cardsSlice';
import useUpdateCard from './useUpdateCard';

jest.mock('../../hooks/useMutation', () => jest.fn());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useUpdateCard', () => {
  afterEach(cleanup);

  it('should call mutate with new card data if cardId and image are provided', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const mockMutate = jest.fn();
    const mockStatus = MutationStatusEnum.SUCCESS;
    const mockErrorCode = null;
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: mockStatus,
      errorCode: mockErrorCode,
    });
    const mockId = 'cardId';
    const mockCardPayload = {
      name: 'newCard',
      gender: Gender.MALE,
      isActive: true,
      locationId: 1,
      episodesId: [1, 2, 3],
    };
    const mockImage = new File(['some image'], 'test-image.jpg', {
      type: 'image/jpeg',
    });
    const mockSetImageError = jest.fn();

    const { result } = renderHook(() =>
      useUpdateCard(
        mockSetImageError,
        { url: 'imageUrl', image: mockImage },
        mockId,
      ),
    );

    act(() => {
      result.current.handleSubmit(mockCardPayload);
    });

    expect(useMutation as jest.Mock).toHaveBeenCalledWith(expect.any(Function));
    expect(mockMutate).toHaveBeenCalledWith({
      id: mockId,
      cardData: mockCardPayload,
      image: mockImage,
    });
    expect(mockDispatch).toHaveBeenCalledWith(getCards());
    expect(mockSetImageError).not.toHaveBeenCalled();
  });

  it('should call mutate with new card data if image is not provided', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: MutationStatusEnum.SUCCESS,
      errorCode: null,
    });
    const mockId = 'cardId';
    const mockCardPayload = {
      name: 'newCard',
      gender: Gender.MALE,
      isActive: true,
      locationId: 1,
      episodesId: [1, 2, 3],
    };
    const mockSetImageError = jest.fn();

    const { result } = renderHook(() =>
      useUpdateCard(mockSetImageError, null, mockId),
    );

    act(() => {
      result.current.handleSubmit(mockCardPayload);
    });

    expect(useMutation as jest.Mock).toHaveBeenCalledWith(expect.any(Function));
    expect(mockMutate).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalledWith(getCards());
    expect(mockSetImageError).toHaveBeenCalledWith(true);
  });
});
