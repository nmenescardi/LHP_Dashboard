const getNextCallTime = (_) => {
  const nextCallTime = new Date();
  nextCallTime.setHours(nextCallTime.getHours() + 1);
  nextCallTime.setMinutes(1, 0, 0);
  return nextCallTime;
};

export default getNextCallTime;
