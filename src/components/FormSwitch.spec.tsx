import { FieldValues, useForm } from 'react-hook-form';
import FormSwitch, { FormSwitchProps } from './FormSwitch';
import { act, render, screen } from '../test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const FormSwitchWithForm = <T extends FieldValues>(
  props: Omit<FormSwitchProps<T>, 'control'> & { isError?: boolean },
) => {
  const { control } = useForm<T>();

  return <FormSwitch {...props} control={control} />;
};

describe('formSwitch component', () => {
  const label = 'switch';

  it('should render switch with label and default value', () => {
    render(
      <FormSwitchWithForm name="switch" label={label} defaultValue={false} />,
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should handle checkbox click', async () => {
    render(
      <FormSwitchWithForm name="switch" label={label} defaultValue={false} />,
    );

    const labelElement = screen.getByLabelText(label);
    await act(async () => {
      userEvent.click(labelElement);
    });

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
