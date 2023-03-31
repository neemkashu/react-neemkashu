import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorMessages } from '../components/Form/formChecker';
import { PetForm } from '../components/Form/PetForm';
import { AnimalTypes } from '../components/Form/Select';

export async function submitForm() {
  const submitButton = screen.getByRole('button');
  const user = userEvent.setup();
  await user.click(submitButton);
}
export async function fillForm() {
  const inputName = screen.getByLabelText<HTMLInputElement>(/name/i);
  const inputDate = screen.getByLabelText<HTMLInputElement>(/date/i);
  const inputSelect = screen.getByLabelText<HTMLSelectElement>(/type/i);
  const inputCheckbox = screen.getByLabelText<HTMLInputElement>(/read/i);
  const inputSwitcher = screen.getByLabelText<HTMLInputElement>(/female/i);
  const inputFile = screen.getByLabelText<HTMLInputElement>(/photo/i);

  const user = userEvent.setup();

  await user.type(inputName, 'Aname');
  await user.type(inputDate, '2020-04-01');
  await user.selectOptions(inputSelect, AnimalTypes.DOG);
  await user.click(inputCheckbox);
  await user.click(inputSwitcher);

  const file = new File(['freddie'], './img/freddie.png', {
    type: 'image/png',
  });

  await userEvent.upload(inputFile, file);
}

describe('Form component', () => {
  it('Renders form', () => {
    const backDataMock = vi.fn();

    render(<PetForm backData={backDataMock} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('renders erros if submit is clicked when form is empty', async () => {
    const backDataMock = vi.fn();

    render(<PetForm backData={backDataMock} />);

    await submitForm();

    screen.getByText(ErrorMessages.name);
    screen.getByText(ErrorMessages.birth);
    screen.getByText(ErrorMessages.type);
    screen.getByText(ErrorMessages.sex);
    screen.getByText(ErrorMessages.img);

    expect(backDataMock).not.toBeCalled();
  });
  it('clears error if form data is valid', async () => {
    const backDataMock = vi.fn();

    render(<PetForm backData={backDataMock} />);

    await submitForm();
    await fillForm();

    await submitForm();

    expect(screen.queryByText(ErrorMessages.name)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.birth)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.type)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.sex)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.img)).not.toBeInTheDocument();
  });
  it('provides callback form data if is valid', async () => {
    const backDataMock = vi.fn((): void => {});

    render(<PetForm backData={backDataMock} />);
    await fillForm();
    await submitForm();

    expect(backDataMock).toBeCalled();
  });
});
