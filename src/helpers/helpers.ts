import { IAuthor } from './interfaces';

export const formatCreationDate = (date: string) => {
  return date.replaceAll('/', '.');
};

export const getAuthorsName = (allAuthors: IAuthor[], authorIds: string[]) => {
  return authorIds.map(
    (el) => allAuthors.find((author) => author.id === el)?.name
  );
};

export const getCourseDuration = (duration: number) => {
  let hh: number | string = Math.floor(duration / 60);
  hh = hh < 10 ? `0${hh}` : hh;
  let mm: number | string = Math.floor(duration % 60);
  mm = mm < 10 ? `0${mm}` : mm;

  return `${hh}:${mm} ${hh === '01' ? 'hour' : 'hours'}`;
};

export const parameterReplacer = (endpoint: string, config: any) =>
  Object.keys(config).reduce(
    (acc, curr) =>
      acc.replace(curr.startsWith(':') ? curr : `:${curr}`, config[curr] ?? ''),
    endpoint
  );
