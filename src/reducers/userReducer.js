import produce from 'immer';

const initialState = {
  data: {
    firstName: null,
    lastName: null,
    email: null,
    avatar: {
      large: null,
      medium: null,
      thumb: null,
    },
  },
  contacts: null,
};

export const userReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case 'SET_USER_DATA': {
        draft.data = payload.data;
        break;
      }
      case 'SET_USER_CONTACTS': {
        draft.contacts = payload.contacts;
      }
      default: {
        return draft;
      }
    }
  });
