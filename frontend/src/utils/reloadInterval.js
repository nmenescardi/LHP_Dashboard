const reloadInterval = (nextCallTime, interval_time = 10000) => {
  return setInterval(() => {
    const now = new Date();
    if (now > nextCallTime.current) {
      window.location.reload();
    }
  }, interval_time);
};

export default reloadInterval;
