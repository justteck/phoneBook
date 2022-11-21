import renderPage from './modules/renderPage.js';
const {
  renderPhoneBook,
  renderContacts,
} = renderPage;

import {hoverRow} from './modules/hoverContacts.js';

import {sortContacts} from './modules/sortContacts.js';

import * as control from './modules/control.js';

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);

  const {
    list,
    logo,
    btnAdd,
    formOverlay,
    form,
    btnDel,
  } = renderPhoneBook(app, title);

  // Функционал
  const allRows = renderContacts(list);
  const {closeModal} = control.modalControl(btnAdd, formOverlay);

  hoverRow(allRows, logo);
  control.deleteControl(btnDel, list);
  control.formControl(form, list, closeModal);
  sortContacts(list, allRows);
};

window.phoneBookInit = init;
