import createElement from './createElement.js';
const {
  createHeader,
  createMain,
  createFooter,
  createLogo,
  createButtonGroup,
  createTable,
  createForm,
} = createElement;

import serviceStorage from './serviceStorage.js';

const {getStorage} = serviceStorage;

// Render data
const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const btnsGroup = createButtonGroup([
    {
      className: 'btn btn-primary',
      type: 'button',
      text: 'Добавить',
    },

    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter(title);

  header.headerContainer.append(logo);
  main.mainContainer.
      append(btnsGroup.btnWrapper, table, overlay);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: btnsGroup.buttons[0],
    btnDel: btnsGroup.buttons[1],
    formOverlay: overlay,
    form,
  };
};

const createRow = ({name: firstName, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');
  const btnDel = document.createElement('button');
  btnDel.classList.add('del-icon');
  tdDel.append(btnDel);

  const tdName = document.createElement('td');
  tdName.textContent = firstName;

  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname;

  const tdPhone = document.createElement('td');
  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;
  tdPhone.append(phoneLink);

  const tdEdit = document.createElement('td');
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('edit');
  btnEdit.type = 'button';
  tdEdit.append(btnEdit);

  tr.phoneLink = phoneLink;
  tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

  return tr;
};

const renderContacts = (list) => {
  const allRows = getStorage('contacts').map(createRow);
  list.innerHTML = '';
  list.append(...allRows);

  return allRows;
};

export default {
  renderPhoneBook,
  renderContacts,
  createRow,
};
