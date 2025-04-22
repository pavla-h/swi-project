import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { NewUser } from './pages/users/NewUser';

describe('NewUser Component', () => {
  it('renders modal and handles close button', () => {
    const mockCreateHandler = jest.fn();

    render(<NewUser createHandler={mockCreateHandler} externalShow={true} />);

    expect(screen.getByText('Create user')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCreateHandler).not.toHaveBeenCalled();
  });
});
