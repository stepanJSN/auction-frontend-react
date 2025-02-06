import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import { ICreateChatForm } from './ManageChatForm';
import ParticipantsFormList from './ParticipantsFormList';
import { cleanup } from '@testing-library/react';
import { render, screen } from '../../test-utils';

jest.mock('../../services/userService');

const ParticipantsFormListWithForm = ({ isError }: { isError: boolean }) => {
  const { control } = useForm<ICreateChatForm>();

  return <ParticipantsFormList isError={isError} control={control} />;
};

describe('Episode list form component', () => {
  afterEach(cleanup);

  it('should render form', () => {
    render(<ParticipantsFormListWithForm isError={false} />);

    expect(
      screen.getAllByRole('combobox', { name: 'Participant' }),
    ).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  it('should display error message if isError is true', () => {
    render(<ParticipantsFormListWithForm isError />);

    expect(screen.getByText('Participants are required')).toBeInTheDocument();
  });
});
