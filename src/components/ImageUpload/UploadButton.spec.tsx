import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadButton from './UploadButton';
import '@testing-library/jest-dom';

describe('UploadButton Component', () => {
  it('renders the button', () => {
    render(
      <UploadButton
        handleUpload={jest.fn()}
        isLoading={false}
        isError={false}
      />,
    );

    const button = screen.getByRole('button', { name: 'Upload image' });
    expect(button).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true and disables the button', () => {
    render(
      <UploadButton
        handleUpload={jest.fn()}
        isLoading={true}
        isError={false}
      />,
    );

    const button = screen.getByRole('button');
    const spinner = screen.getByRole('progressbar');

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(spinner).toBeInTheDocument();
  });

  it('calls handleUpload when a file is selected', async () => {
    const handleUpload = jest.fn();
    render(
      <UploadButton
        handleUpload={handleUpload}
        isLoading={false}
        isError={false}
      />,
    );

    const fileInput = screen.getByLabelText('Upload image');
    const file = new File(['some image'], 'test-image.jpg', {
      type: 'image/jpeg',
    });

    userEvent.upload(fileInput, file);

    expect(handleUpload).toHaveBeenCalledTimes(1);
  });
});
