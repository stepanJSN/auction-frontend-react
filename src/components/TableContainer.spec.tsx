import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import TableContainer from './TableContainer';

describe('TableContainer', () => {
  it('should render TableContainer', () => {
    const childText = 'children';
    render(
      <TableContainer>
        <tbody>{childText}</tbody>
      </TableContainer>,
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
