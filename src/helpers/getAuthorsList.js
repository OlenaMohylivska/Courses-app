export const getAuthorsList = (authors, mockedAuthorsList) => {
  const list = [];
  mockedAuthorsList.forEach((author) => {
    if (authors.includes(author.id)) {
      list.push(author.name);
    }
  });
  return list.join(', ');
};
