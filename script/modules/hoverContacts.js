// Hover a line of contacts
export const hoverRow = (allRows, logo) => {
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
