import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { ErrorMessages } from '../components/Form/formChecker';
import { PetForm } from '../components/Form/PetForm';
import { AnimalTypes } from '../components/Form/Select';
import { store } from '../store';

export async function submitForm(): Promise<void> {
  const submitButton = screen.getByRole('button');
  const user = userEvent.setup();
  await user.click(submitButton);
}
export async function fillForm(): Promise<void> {
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

    render(
      <Provider store={store}>
        <PetForm backData={backDataMock} />
      </Provider>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('renders erros if submit is clicked when form is empty', async () => {
    const backDataMock = vi.fn();

    render(
      <Provider store={store}>
        <PetForm backData={backDataMock} />
      </Provider>
    );

    await submitForm();

    screen.getByText('Write the name');
    screen.getByText(ErrorMessages.birth);
    screen.getByText(ErrorMessages.type);
    screen.getByText(ErrorMessages.sex);
    screen.getByText(ErrorMessages.img);

    expect(backDataMock).not.toBeCalled();
  });
  it('renders another error for incorrect filling of name', async () => {
    const backDataMock = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <PetForm backData={backDataMock} />
      </Provider>
    );

    await submitForm();

    screen.getByText('Write the name');
    expect(screen.queryByText(ErrorMessages.name)).not.toBeInTheDocument();

    const inputName = screen.getByLabelText<HTMLInputElement>(/name/i);
    await user.type(inputName, 'aname');

    await submitForm();

    expect(screen.queryByText('Write the name')).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.name)).toBeInTheDocument();
  });
  it('clears error if form data is valid', async () => {
    const backDataMock = vi.fn();

    render(
      <Provider store={store}>
        <PetForm backData={backDataMock} />
      </Provider>
    );

    await submitForm();
    await fillForm();

    await submitForm();

    expect(screen.queryByText('Write the name')).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.name)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.birth)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.type)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.sex)).not.toBeInTheDocument();
    expect(screen.queryByText(ErrorMessages.img)).not.toBeInTheDocument();
  });
  it('provides callback form data if is valid', async () => {
    const backDataMock = vi.fn((): void => {});

    render(
      <Provider store={store}>
        <PetForm backData={backDataMock} />
      </Provider>
    );
    await fillForm();
    await submitForm();

    expect(backDataMock).toBeCalled();
  });
});
