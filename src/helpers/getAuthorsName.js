export const getAuthorsName = (allAuthors, authorIds) => {
  return authorIds.map(
    (el) => allAuthors.find((author) => author.id === el)?.name
  );
};
