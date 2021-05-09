const getPercentChange = (previous, current) => {
  previous = parseFloat(previous);
  current = parseFloat(current);
  if (current === previous || !previous) return 0;

  const change = ((Math.abs(current - previous) / previous) * 100.0).toFixed(2);
  return current >= previous ? change : change * -1;
};

export default getPercentChange;
