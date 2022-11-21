// Local Storage
const getStorage = (key) => {
  const contacts = JSON.parse(localStorage.getItem(key)) || [];

  return Array.isArray(contacts) ? contacts : [contacts];
};

const setStorage = (key, contact) => {
  const contacts = getStorage(key);

  contacts.push(contact);
  localStorage.setItem(key, JSON.stringify(contacts));
};

const removeStorage = (key, phoneNumber) => {
  const contactsInStorage = getStorage(key);

  const indexToDelete = contactsInStorage.
      findIndex(contact => contact.phone === String(phoneNumber));
  contactsInStorage.splice(indexToDelete, 1);

  localStorage.setItem(key, JSON.stringify(contactsInStorage));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};
