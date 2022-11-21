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

export default {
  createContainer,
  createHeader,
  createMain,
  createFooter,
  createLogo,
  createButtonGroup,
  createTable,
  createForm,
};
