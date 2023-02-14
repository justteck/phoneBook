import {sortContacts} from './sortContacts';

import serviceStorage from './serviceStorage';
const {
  getStorage,
  setStorage,
  removeStorage,
} = serviceStorage;

import renderPage from './renderPage';
const {renderContacts} = renderPage;


// Update
const updatePageData = (list) => {
  const allRows = renderContacts(list);
  sortContacts(list, allRows);
};

// Check if same number
const isDuplicateNumber = (newContact) =>
  getStorage('contacts').find(contact =>
    contact.phone === newContact.phone);

// Control
export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.close') || target.matches('.form-overlay')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (btnDel, list, logo) => {
  const toggleDeleteButton = () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  };

  btnDel.addEventListener('click', toggleDeleteButton);

  list.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.del-icon')) {
      const contactToDelete = target.closest('.contact');
      const contactToDeletePhoneNumber =
        contactToDelete.querySelector('a').textContent;
      removeStorage('contacts', contactToDeletePhoneNumber);
      toggleDeleteButton();
      updatePageData(list, logo);
    }
  });
};

export const formControl = (form, list, closeModal, logo) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);

    if (!isDuplicateNumber(newContact)) {
      setStorage('contacts', newContact);
      updatePageData(list, logo);
    } else {
      alert('Контакт с таким номером уже существует!');
    }
    form.reset();
    closeModal();
  });
};

