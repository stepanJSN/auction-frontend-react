import '@testing-library/jest-dom';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { cleanup, render } from '../../../test-utils';
import ChatField from './ChatField';
import Message from './Message';

jest.mock('./Message');
jest.mock('usehooks-ts', () => ({
  useIntersectionObserver: jest.fn(() => ({
    isIntersecting: true,
    ref: jest.fn(),
  })),
}));

describe('ChatField', () => {
  const mockMessages = [
    {
      id: 'message1',
      message: 'Hello',
      sender: {
        is_this_user_message: true,
        name: 'John',
        surname: 'Doe',
      },
      creationStatus: MutationStatusEnum.IDLE,
      deletionStatus: MutationStatusEnum.IDLE,
    },
    {
      id: 'message2',
      message: 'How are you?',
      sender: {
        is_this_user_message: false,
        name: 'Test',
        surname: 'USer',
      },
      creationStatus: MutationStatusEnum.IDLE,
      deletionStatus: MutationStatusEnum.IDLE,
    },
  ];
  afterEach(cleanup);

  it('should render ChatField with messages', () => {
    const mockOnDeleteMessage = jest.fn();
    const mockOnResendMessage = jest.fn();
    render(
      <ChatField
        messages={mockMessages}
        isScrollToBottomActive={false}
        onDeleteMessage={mockOnDeleteMessage}
        onResendMessage={mockOnResendMessage}
        onLoadMoreMessages={jest.fn()}
      />,
    );

    expect(Message).toHaveBeenCalledWith(
      {
        message: mockMessages[0],
        onDelete: mockOnDeleteMessage,
        onResend: mockOnResendMessage,
      },
      expect.anything(),
    );
    expect(Message).toHaveBeenCalledWith(
      {
        message: mockMessages[1],
        onDelete: mockOnDeleteMessage,
        onResend: mockOnResendMessage,
      },
      expect.anything(),
    );
  });

  it('should call onLoadMoreMessages when scrolled to top', () => {
    const mockOnLoadMoreMessages = jest.fn();
    render(
      <ChatField
        messages={mockMessages}
        isScrollToBottomActive={false}
        onDeleteMessage={jest.fn()}
        onResendMessage={jest.fn()}
        onLoadMoreMessages={mockOnLoadMoreMessages}
      />,
    );

    expect(mockOnLoadMoreMessages).toHaveBeenCalled();
  });
});
