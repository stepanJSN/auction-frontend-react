import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { render } from '../../test-utils';
import ChatsTable from './ChatsTable';
import ChatsTableRow from './ChatsTableRow';

jest.mock('./ChatsTableRow');

describe('ChatsTable', () => {
  afterEach(cleanup);

  it('should render chat table for each chat', () => {
    const mockChats = [
      {
        id: 'chat1',
        name: 'Chat 1',
        lastMessage: null,
      },
      {
        id: 'chat2',
        name: 'Chat 2',
        lastMessage: null,
      },
    ];
    render(<ChatsTable chats={mockChats} />);

    expect(ChatsTableRow).toHaveBeenCalledTimes(2);
    expect(ChatsTableRow).toHaveBeenCalledWith(
      {
        chat: mockChats[0],
      },
      expect.anything(),
    );
    expect(ChatsTableRow).toHaveBeenCalledWith(
      {
        chat: mockChats[1],
      },
      expect.anything(),
    );
  });
});
