import '@testing-library/jest-dom';
import { act, render, screen } from '../../../test-utils';
import ChatHeader from './ChatHeader';
import userEvent from '@testing-library/user-event';

describe('ChatHeader', () => {
  const chatName = 'Chat name';
  const numberOfParticipants = 3;

  it('should render ChatHeader with provided data', () => {
    render(
      <ChatHeader
        name={chatName}
        numberOfParticipants={numberOfParticipants}
        isOpenSettingsButtonShown={false}
        onSettingsButtonClick={jest.fn()}
      />,
    );

    expect(screen.getByText(chatName)).toBeInTheDocument();
    expect(
      screen.getByText(`Number of participants: ${numberOfParticipants}`),
    ).toBeInTheDocument();
  });

  it('should render settings button if isOpenSettingsButtonShown is true and call onSettingsButtonClick', async () => {
    const onSettingsButtonClick = jest.fn();
    render(
      <ChatHeader
        name={chatName}
        numberOfParticipants={numberOfParticipants}
        isOpenSettingsButtonShown={true}
        onSettingsButtonClick={onSettingsButtonClick}
      />,
    );

    const settingsButton = screen.getByRole('button', {
      name: 'open chat settings',
    });
    expect(settingsButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(settingsButton);
    });

    expect(onSettingsButtonClick).toHaveBeenCalled();
  });
});
