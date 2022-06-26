export const getCourseDuration = (duration) => {
  let hh = Math.floor(duration / 60);
  hh = hh < 10 ? `0${hh}` : hh;
  let mm = Math.floor(duration % 60);
  mm = mm < 10 ? `0${mm}` : mm;

  return `${hh}:${mm} ${hh === '01' ? 'hour' : 'hours'}`;
};
