/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FORM_SEARCH_KEY } from './Search';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const findPhotos = async ({ request }: { request: Record<string, any> }) => {
  console.log('ACTION request', request);

  // const data = await request.text();
  // console.log('ACTION request data', data);

  const formData = await request.formData();

  console.log('ACTION request', formData.get(FORM_SEARCH_KEY));
  return null;
};
