const reloadInterval = (
  nextCallTime,
  setShouldFetchPairs,
  interval_time = 10000
) => {
  return setInterval(() => {
    const now = new Date();
    if (now > nextCallTime.current) {
      setShouldFetchPairs(true);
    }
  }, interval_time);
};

export default reloadInterval;
