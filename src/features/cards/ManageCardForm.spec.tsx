import '@testing-library/jest-dom';
import { act, cleanup, waitFor } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import ManageCardForm from './ManageCardForm';
import userEvent from '@testing-library/user-event';
import { locationsService } from '../../services/locationsService';
import { Gender } from '../../enums/gender.enum';

describe('Manage card from component', () => {
  afterEach(cleanup);

  it('should display error if inputs are empty', async () => {
    const mockOnSubmit = jest.fn();
    const action = <button type="submit">Submit</button>;
    render(
      <ManageCardForm
        onSubmit={mockOnSubmit}
        isSubmitSuccessful={false}
        actions={action}
      />,
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(
      screen.getByText('The name must be between 2 and 15 characters long'),
    ).toBeInTheDocument();
    expect(screen.getByText('Please select a location')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit if inputs` values are valid', async () => {
    const mockOnSubmit = jest.fn();
    const action = <button type="submit">Submit</button>;
    const mockName = 'name';
    const mockType = 'type';
    const mockLocation = {
      id: 1,
      name: 'testLocation',
      type: 'type',
    };
    const mockLocationData = {
      data: [mockLocation],
      info: {
        page: 1,
        totalCount: 1,
        totalPages: 1,
      },
    };
    const mockEpisodes = [
      {
        id: 1,
        name: 'testEpisode',
        code: 'test',
      },
    ];
    jest.spyOn(locationsService, 'getAll').mockResolvedValue(mockLocationData);
    render(
      <ManageCardForm
        onSubmit={mockOnSubmit}
        isSubmitSuccessful={false}
        actions={action}
        data={{ episodes: mockEpisodes } as any}
      />,
    );

    const nameInput = screen.getByLabelText('Name');
    const typeInput = screen.getByLabelText('Type');
    const activeSwitch = screen.getByLabelText('Active');
    const locationInput = screen.getByLabelText('Location');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await act(async () => {
      userEvent.type(nameInput, mockName);
      userEvent.type(typeInput, mockType);
      userEvent.click(activeSwitch);
      userEvent.type(locationInput, mockLocation.name);
    });
    await waitFor(() => {
      const option = screen.getByText(mockLocation.name);
      userEvent.click(option);
      userEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: mockName,
      type: mockType,
      gender: Gender.MALE,
      isActive: true,
      locationId: mockLocation.id,
      episodesId: [mockEpisodes[0].id],
    });
  });

  it('should display default values if provided', async () => {
    const mockOnSubmit = jest.fn();
    const action = <button type="submit">Submit</button>;
    const mockName = 'name';
    const mockType = 'type';
    const mockLocation = {
      id: 1,
      name: 'testLocation',
      type: 'type',
    };
    const mockLocationData = {
      data: [mockLocation],
      info: {
        page: 1,
        totalCount: 1,
        totalPages: 1,
      },
    };
    const mockEpisodes = [
      {
        id: 1,
        name: 'testEpisode',
        code: 'test',
      },
    ];
    jest.spyOn(locationsService, 'getAll').mockResolvedValue(mockLocationData);
    render(
      <ManageCardForm
        onSubmit={mockOnSubmit}
        isSubmitSuccessful={true}
        actions={action}
        data={
          {
            episodes: mockEpisodes,
            name: mockName,
            type: mockType,
            is_active: true,
            location: mockLocation,
            gender: Gender.MALE,
          } as any
        }
      />,
    );

    const nameInput = screen.getByDisplayValue(mockName);
    const typeInput = screen.getByDisplayValue(mockType);
    const activeSwitch = screen.getByLabelText('Active');
    const locationInput = screen.getByDisplayValue(mockLocation.name);
    const episodeInput = screen.getByDisplayValue(mockEpisodes[0].name);

    expect(nameInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(activeSwitch).toBeChecked();
    expect(locationInput).toBeInTheDocument();
    expect(episodeInput).toBeInTheDocument();
  });
});
