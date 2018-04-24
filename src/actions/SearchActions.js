import { SEARCH } from './types';

export const searchChanged = text => ({
  type: SEARCH,
  payload: text,
});
