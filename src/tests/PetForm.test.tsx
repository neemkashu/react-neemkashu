import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorMessages, PetFormData } from '../components/Form/formChecker';
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

  inputName.value = 'Aname';
  inputDate.value = '2013-12-12';
  inputSelect.value = AnimalTypes.DOG;
  inputSwitcher.checked = true;
  inputCheckbox.checked = true;

  const file = new File(['freddie'], './img/freddie.png', {
    type: 'image/png',
  });

  await userEvent.upload(inputFile, file);
}

describe('Form component', () => {
  it('Renders form', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const backDataMock = (x: PetFormData): void => {};

    render(<PetForm backData={backDataMock} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('renders erros if submit is clicked when form is empty', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const backDataMock = vi.fn((x: PetFormData): void => {});

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const backDataMock = vi.fn((x: PetFormData): void => {});

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
