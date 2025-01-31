import { render, screen, fireEvent } from '@testing-library/react';
import ImageUpload from './ImageUpload';
import '@testing-library/jest-dom';

jest.mock('./UploadButton', () =>
  jest.fn(() => <input data-testid="upload-button" type="file" />),
);

describe('ImageUpload Component', () => {
  it('renders UploadButton when no image is uploaded', () => {
    render(
      <ImageUpload
        isPending={false}
        isError={false}
        handleUpload={jest.fn()}
        handleDelete={jest.fn()}
      />,
    );

    expect(screen.getByTestId('upload-button')).toBeInTheDocument();
  });

  it('renders uploaded image and delete button when imageUrl is provided', () => {
    const imageUrl = 'https://example.com/test.jpg';

    render(
      <ImageUpload
        isPending={false}
        isError={false}
        handleUpload={jest.fn()}
        handleDelete={jest.fn()}
        imageUrl={imageUrl}
      />,
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);
    expect(
      screen.getByRole('button', { name: 'delete image' }),
    ).toBeInTheDocument();
  });

  it('calls handleDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(
      <ImageUpload
        isPending={false}
        isError={false}
        handleUpload={jest.fn()}
        handleDelete={handleDelete}
        imageUrl="https://example.com/test.jpg"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'delete image' }));

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('disables delete button when isPending is true', () => {
    render(
      <ImageUpload
        isPending={true}
        isError={false}
        handleUpload={jest.fn()}
        handleDelete={jest.fn()}
        imageUrl="https://example.com/test.jpg"
      />,
    );

    expect(screen.getByRole('button', { name: 'delete image' })).toBeDisabled();
  });

  it('shows error message when isError is true', () => {
    render(
      <ImageUpload
        isPending={false}
        isError={true}
        handleUpload={jest.fn()}
        handleDelete={jest.fn()}
      />,
    );

    expect(screen.getByText('Image is required')).toBeInTheDocument();
  });
});
