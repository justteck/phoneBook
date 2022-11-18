'use strict';

{
  // Create HTML
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();

    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();

    footerContainer.textContent = `Все права защищены ©${title}`;
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createButtonGroup = (data) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const buttons = data.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      button.style.marginRight = '10px';

      return button;
    });

    btnWrapper.append(...buttons);

    return {
      btnWrapper,
      buttons,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-stripped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('afterbegin', `
      <tr>
        <td class="delete"></td>
        <td data="forsort">Имя</td>
        <td data="forsort">Фамилия</td>
        <td>Телефон</td>
        <td></td>
      </tr>
    `);
    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    form.insertAdjacentHTML('afterbegin', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name"
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname"
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone"
          id="phone" type="number" required>
      </div>
    `);

    const buttons = createButtonGroup([
      {
        className: 'btn btn-primary',
        type: 'submit',
        text: 'Добавить',
      },

      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttons.buttons);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  // Funcs
  // Hover a line of contacts ----
  const hoverRow = (allRows, logo) => {
    const logoText = logo.textContent;

    allRows.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = logoText;
      });
    });
  };

  // Local Storage ---------------
  const getStorage = (key) => {
    const contacts = JSON.parse(localStorage.getItem(key)) || [];
    // console.log('CURR STORAGE: ',
    //   Array.isArray(contacts) ? contacts : [contacts]);
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

  // Sort -------------------------
  const sortBy = (contacts, columnForSort) => {
    const sortedContacts = contacts.sort((a, b) =>
      a.children[columnForSort].textContent.
          localeCompare(b.children[columnForSort].textContent));

    return sortedContacts;
  };

  const sortContacts = (list, allRows) => {
    const sort = (index) => {
      const sortedContacts = sortBy(allRows, index);
      list.innerHTML = '';
      list.append(...sortedContacts);
    };

    const defaultSort = +localStorage.getItem('sortBy');

    if (defaultSort) {
      sort(defaultSort);
    }

    document.querySelector('thead').addEventListener('click', (e) => {
      const target = e.target;
      const columnIndex = e.target.cellIndex;

      localStorage.setItem('sortBy', columnIndex);

      if (target.matches('td[data=forsort]')) {
        sort(columnIndex);
      }
    });
  };

  // Render data ------------------
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

  // Update ------------------------
  const updatePageData = (list) => {
    const allRows = renderContacts(list);
    sortContacts(list, allRows);
  };

  // Check if same number
  const isDuplicateNumber = (newContact) =>
    getStorage('contacts').find(contact =>
      contact.phone === newContact.phone);

  // Control ------------------------
  const modalControl = (btnAdd, formOverlay) => {
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

  const deleteControl = (btnDel, list, logo) => {
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

  const formControl = (form, list, closeModal, logo) => {
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
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRows, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    sortContacts(list, allRows);
  };
  window.phoneBookInit = init;
}
