const getNextCallTime = (_) => {
  var nextCallTime = new Date();
  nextCallTime.setHours(nextCallTime.getHours() + 1);
  nextCallTime.setMinutes(1, 0, 0);

  console.log(`nextCallTime`, nextCallTime);
  return nextCallTime;
};

export default getNextCallTime;
