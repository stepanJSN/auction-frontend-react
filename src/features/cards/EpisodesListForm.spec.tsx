import '@testing-library/jest-dom';
import EpisodesListForm, { EpisodesListFormProps } from './EpisodesListForm';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ICreateCardFrom } from './ManageCardForm';
import { act, cleanup, waitFor } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { episodesService } from '../../services/episodesService';

const defaultEpisodeName = 'test episode';

const EpisodesListFormWithForm = (
  props: Omit<EpisodesListFormProps, 'control'>,
) => {
  const { control, setValue } = useForm<ICreateCardFrom>();

  useEffect(() => {
    setValue('episodes', [
      {
        id: 1,
        name: defaultEpisodeName,
        code: 'ESCode',
      },
    ]);
  }, [setValue]);

  return <EpisodesListForm {...props} control={control} />;
};

describe('Episode list form component', () => {
  afterEach(cleanup);

  it('should render input with provided episode name and empty input for new episode', () => {
    render(
      <EpisodesListFormWithForm isError={false} isSubmitSuccessful={false} />,
    );

    expect(screen.getByDisplayValue(defaultEpisodeName)).toBeInTheDocument();
    expect(screen.getAllByRole('combobox', { name: 'Episode' })).toHaveLength(
      2,
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('should delete episode from list', async () => {
    render(
      <EpisodesListFormWithForm isError={false} isSubmitSuccessful={false} />,
    );

    const removeBtn = screen.getByRole('button', { name: 'Remove' });
    await act(async () => {
      userEvent.click(removeBtn);
    });

    expect(
      screen.queryByDisplayValue(defaultEpisodeName),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('combobox', { name: 'Episode' })).toHaveLength(
      1,
    );
    expect(removeBtn).not.toBeInTheDocument();
  });

  it('should add episode to list', async () => {
    jest.spyOn(episodesService, 'getAll').mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'testEpisode',
          code: 'testCode',
        },
      ],
      info: {
        page: 1,
        totalCount: 1,
        totalPages: 1,
      },
    });
    render(
      <EpisodesListFormWithForm isError={false} isSubmitSuccessful={false} />,
    );

    const input = screen.getAllByRole('combobox', { name: 'Episode' })[1];
    const addButton = screen.getByRole('button', { name: 'Add' });
    await act(async () => {
      userEvent.type(input, 'test');
    });
    await waitFor(() => {
      const option = screen.getByText('testEpisode');
      userEvent.click(option);
      userEvent.click(addButton);
    });

    expect(screen.queryByDisplayValue(defaultEpisodeName)).toBeInTheDocument();
    expect(screen.queryByDisplayValue('testEpisode')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox', { name: 'Episode' })).toHaveLength(
      3,
    );
  });

  it('should not add episode to list if input is empty', async () => {
    render(
      <EpisodesListFormWithForm isError={false} isSubmitSuccessful={false} />,
    );

    const addButton = screen.getByRole('button', { name: 'Add' });
    expect(addButton).toBeDisabled();
  });

  it('should display error message if isError is true', () => {
    render(<EpisodesListFormWithForm isError isSubmitSuccessful={false} />);

    expect(screen.getByText('Episodes are required')).toBeInTheDocument();
  });
});
