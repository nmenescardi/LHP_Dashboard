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
    sortType: 'number',
    Cell: ({ cell: { value } }) => {
      return <>{value ? (value > 0 ? '+' + value : value) + '%' : '...'}</>;
    },
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
