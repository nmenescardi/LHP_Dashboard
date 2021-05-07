import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { COLUMNS } from './columns';

export const Table = ({ data }) => {
  const columns = useMemo(() => COLUMNS, []);
  //const data = useMemo(() => data, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false,
      autoResetFilters: false,
    },
    useFilters,
    useSortBy
  );

  const [filterInput, setFilterInput] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter('symbol', value);
    setFilterInput(value);
  };

  return (
    <>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={'Search symbol'}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
