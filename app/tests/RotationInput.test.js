import { render, fireEvent } from '@testing-library/react';
import RotationInput from '../components/RotationInput';

test('adds a member and removes it', () => {
  const addMember = jest.fn();
  const removeMember = jest.fn();
  const { getByPlaceholderText, getByRole, getAllByRole } = render(
    <RotationInput addMember={addMember} removeMember={removeMember} members={[]} />
  );

  const input = getByPlaceholderText('Add member');
  const addButton = getByRole('button', { name: /Add/i });

  fireEvent.change(input, { target: { value: 'Alice' } });
  fireEvent.click(addButton);

  expect(addMember).toHaveBeenCalledWith('Alice');

  if (getAllByRole('button', { name: /Remove/i }).length > 0) {
    const removeButton = getAllByRole('button', { name: /Remove/i })[0];
    fireEvent.click(removeButton);

    expect(removeMember).toHaveBeenCalledWith(0);
  }
});