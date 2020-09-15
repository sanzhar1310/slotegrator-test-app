export const setUserData = ({ results }) => {
  const [user] = results;
  return {
    type: 'SET_USER_DATA',
    payload: {
      data: {
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        phone: user.phone,
        country: user.location.country,
        gender: user.gender,
        avatar: {
          large: user.picture.large,
          medium: user.picture.medium,
          thumb: user.picture.thumbnail,
        },
      },
    },
  };
};

export const setUserContacts = ({ results }) => {
  return {
    type: 'SET_USER_CONTACTS',
    payload: {
      contacts: results.map((contact) => ({
        firstName: contact.name.first,
        lastName: contact.name.last,
        email: contact.email,
        phone: contact.phone,
        country: contact.location.country,
        gender: contact.gender,
        avatar: {
          large: contact.picture.large,
          medium: contact.picture.medium,
          thumb: contact.picture.thumbnail,
        },
      })),
    },
  };
};
