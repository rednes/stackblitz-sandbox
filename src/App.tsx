import './style.css';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FC, useEffect, useState } from 'react';

import { columns, User } from './column';
import { getData } from './data';

export const App: FC = () => {
  const [data, setData] = useState<User[]>([]);

  const initialPageIndex = 0;
  const initialPageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      setData(await getData());
    };
    fetchData();
  }, []);

  const table = useReactTable<User>({
    columns,
    data,
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
      sorting: [{ id: 'id', desc: true }],
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <main>
        <table>
          <tbody>
            <tr>
              <td>PaginationState</td>
              <td>{JSON.stringify(table.getState().pagination)}</td>
            </tr>
            <tr>
              <td>SortingState</td>
              <td>{JSON.stringify(table.getState().sorting)}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            margin: '5px',
          }}
        >
          <select
            style={{ margin: '5px' }}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                表示数 {pageSize}
              </option>
            ))}
          </select>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          {table.getPageOptions().map((page) => {
            return (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                disabled={table.getState().pagination.pageIndex === page}
              >
                {page + 1}
              </button>
            );
          })}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
        </div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: '10px' }} />
      </main>
    </div>
  );
};
