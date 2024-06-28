export const formatNormalToISO = (date, time) => {
  const timeStamp = new Date(`${date}T${time}`);
  const timeStampISO = timeStamp.toISOString();
  return timeStampISO;
};
