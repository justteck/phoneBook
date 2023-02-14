import renderPage from './script/renderPage';
const {
  renderPhoneBook,
  renderContacts,
} = renderPage;

import {hoverRow} from './script/hoverContacts';

import {sortContacts} from './script/sortContacts';

import * as control from './script/control';

import './index.html';
import './scss/index.scss';

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
