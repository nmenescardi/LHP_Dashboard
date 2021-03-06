const roundCellValue = ({ cell: { value } }) => {
  return <>{value ? parseFloat(value).toFixed(3) : '...'}</>;
};

const bgColors = {
  green: '#6bad10',
  red: '#d0021b',
};

const vwap_styles = (bgColor = bgColors.red) => {
  return {
    background: bgColor,
    color: '#fff',
    padding: '6px 9px',
    borderRadius: '7px',
    fontSize: '15px',
    letterSpacing: '0.6px',
    minWidth: '80px',
    display: 'inline-block',
    textAlign: 'center',
  };
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
      let vwap_value, styles;
      if (value) {
        if (value > 0) {
          vwap_value = '+' + value;
          styles = vwap_styles(bgColors.green);
        } else {
          vwap_value = value;
          styles = vwap_styles();
        }
        vwap_value = vwap_value + '%';
      } else {
        vwap_value = '...';
        styles = {};
      }

      return <span style={styles}>{vwap_value}</span>;
    },
  },
  {
    Header: 'Delta',
    accessor: 'delta',
    sortType: 'basic',
    Cell: ({ cell: { value: delta } }) => {
      let cell_value, styles;
      if (delta) {
        delta = delta.toFixed(2);
        if (delta > 0) {
          cell_value = '+' + delta;
          styles = vwap_styles(bgColors.green);
        } else {
          cell_value = delta;
          styles = vwap_styles();
        }
        cell_value = cell_value + '%';
      } else {
        cell_value = '...';
        styles = {};
      }

      return <span style={styles}>{cell_value}</span>;
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
