// Sort
const sortBy = (contacts, columnForSort) => {
  const sortedContacts = contacts.sort((a, b) =>
    a.children[columnForSort].textContent.
        localeCompare(b.children[columnForSort].textContent));

  return sortedContacts;
};

export const sortContacts = (list, allRows) => {
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
