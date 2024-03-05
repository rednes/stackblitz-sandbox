import { Column, ColumnDef, SortDirection } from '@tanstack/react-table';
import { format, parse } from 'date-fns';
import { ja } from 'date-fns/locale/ja';
import { JSX } from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
  TiEdit,
} from 'react-icons/ti';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number; // UNIX timestamp（ミリ秒）
  createdAtStr: string; // ISO時刻文字列
};

const getSortIcon = (sortDirection: false | SortDirection): JSX.Element => {
  switch (sortDirection) {
    case 'asc':
      return <TiArrowSortedUp />;
    case 'desc':
      return <TiArrowSortedDown />;
    default:
      return <TiArrowUnsorted />;
  }
};

const sortableHeader =
  (headerName: string) =>
  ({ column }: { column: Column<User, unknown> }): JSX.Element => {
    return (
      <div
        style={{ flex: 'auto', alignItems: 'center', cursor: 'pointer' }}
        onClick={column.getToggleSortingHandler()}
      >
        {headerName}
        {getSortIcon(column.getIsSorted())}
      </div>
    );
  };

export const columns: ColumnDef<User>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() =>
            alert(`${user.id}:${user.email}の編集ボタンがクリックされました。`)
          }
        >
          <TiEdit />
        </div>
      );
    },
  },
  {
    accessorKey: 'id',
    header: sortableHeader('ID'),
  },
  {
    accessorKey: 'lastName',
    header: '名字',
  },
  {
    accessorKey: 'firstName',
    header: '名前',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'createdAt',
    header: sortableHeader('登録日時(UNIX)'),
    cell: ({ row }) => {
      const user = row.original;
      return format(new Date(user.createdAt), 'yyyy/MM/dd HH:mm', {
        locale: ja,
      });
    },
    filterFn: (row, _, filterValue) => {
      const { from, to } = filterValue as { from?: string; to?: string };
      const createdAt = row?.original?.createdAt;

      return (
        (!from ||
          parse(from, 'yyyy-MM-dd', new Date()).getTime() <= createdAt) &&
        (!to || createdAt <= parse(to, 'yyyy-MM-dd', new Date()).getTime())
      );
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'createdAtStr',
    header: sortableHeader('登録日時(ISO時刻)'),
    enableGlobalFilter: false,
  },
];
