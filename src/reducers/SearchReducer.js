import { SEARCH } from '../actions/types';

const INITIAL_STATE = {
  search: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, search: action.payload };
    default:
      return { ...state };
  }
};
