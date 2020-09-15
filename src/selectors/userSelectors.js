import { createSelector } from 'reselect';

const getUserData = (state) => state.user.data;
const getUserContacts = (state) => state.user.contacts;

export const selectUserData = createSelector([getUserData], (userData) => userData);
export const selectUserContacts = createSelector([getUserContacts], (contacts) => contacts);
