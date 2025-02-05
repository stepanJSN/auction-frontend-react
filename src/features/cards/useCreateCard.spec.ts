import { useDispatch } from 'react-redux';
import useMutation from '../../hooks/useMutation';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { afterEach } from 'node:test';
import { act, cleanup, renderHook } from '@testing-library/react';
import useCreateCard from './useCreateCard';
import { Gender } from '../../enums/gender.enum';
import { getCards } from './cardsSlice';

jest.mock('../../hooks/useMutation', () => jest.fn());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useCreateCard', () => {
  afterEach(cleanup);

  it('should call mutate with card data', () => {
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

    const { result } = renderHook(() => useCreateCard());

    act(() => {
      result.current.createCard(mockCardPayload, mockImage);
    });

    expect(useMutation as jest.Mock).toHaveBeenCalledWith(expect.any(Function));
    expect(mockMutate).toHaveBeenCalledWith({
      cardData: mockCardPayload,
      image: mockImage,
    });
    expect(mockDispatch).toHaveBeenCalledWith(getCards());
  });
});
