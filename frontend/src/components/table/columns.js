const roundCellValue = ({ cell: { value } }) => {
  return <>{value ? parseFloat(value).toFixed(3) : '...'}</>;
};

export const COLUMNS = [
  {
    Header: 'Symbol',
    accessor: 'symbol',
  },
  {
    Header: 'Current Offset',
    accessor: 'offset',
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: roundCellValue,
  },
  {
    Header: 'Vwap',
    accessor: 'vwap',
    Cell: roundCellValue,
  },
];
