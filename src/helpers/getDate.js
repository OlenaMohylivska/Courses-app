export const getDate = () => {
  const now = new Date();
  const date = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`;
  let month = now.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  return `${date}/${month}/${now.getFullYear()}`;
};
