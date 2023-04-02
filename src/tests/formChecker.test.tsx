import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { FieldMessages, PetFormData, getErrorMessages } from '../components/Form/formChecker';

describe('getErrorMessages validates every field of a form', () => {
  it('no messages if fields are ok', async () => {
    render(
      <label htmlFor="file">
        input
        <input
          type="file"
          id="file"
        />
      </label>
    );
    const file = new File(['freddie'], './img/freddie.png', {
      type: 'image/png',
    });
    const fileInput = screen.getByLabelText<HTMLInputElement>('input');

    await userEvent.upload(fileInput, file);

    const formData: PetFormData = {
      name: 'Agere',
      birth: '2013-03-03',
      type: 'dog',
      sex: 'male',
      isExperienced: true,
      img: fileInput.files,
    };

    const expectedMessages: FieldMessages = {
      name: '',
      birth: '',
      type: '',
      sex: '',
      isExperienced: '',
      img: '',
    };

    const messages = getErrorMessages(formData);

    expect(messages).toStrictEqual(expectedMessages);
  });
  it('all messages if fields are not ok', async () => {
    const formData: PetFormData = {
      name: 'agere',
      birth: '2043-03-03',
      type: '',
      sex: '',
      isExperienced: false,
      img: null,
    };

    const expectedMessages: FieldMessages = {
      name: 'Enter a name with the first uppercase letter.',
      birth: 'Choose a date of birth that is earlier than today.',
      type: 'Choose the type of pet.',
      sex: 'Choose male or female.',
      isExperienced: 'Confirm that you have read the rules of the show',
      img: 'Choose a file with a picture',
    };

    const messages = getErrorMessages(formData);

    expect(messages).toStrictEqual(expectedMessages);
  });
  it('all messages if fields are not ok (empty name and birth)', async () => {
    const formData: PetFormData = {
      name: '',
      birth: '',
      type: '',
      sex: '',
      isExperienced: false,
      img: null,
    };

    const expectedMessages: FieldMessages = {
      name: 'Enter a name with the first uppercase letter.',
      birth: 'Choose a date of birth that is earlier than today.',
      type: 'Choose the type of pet.',
      sex: 'Choose male or female.',
      isExperienced: 'Confirm that you have read the rules of the show',
      img: 'Choose a file with a picture',
    };

    const messages = getErrorMessages(formData);

    expect(messages).toStrictEqual(expectedMessages);
  });
});
