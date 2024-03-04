import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale/ja';
import { TiEdit } from 'react-icons/ti';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number; // UNIX timestamp（ミリ秒）
  createdAtStr: string; // ISO時刻文字列
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
    header: 'ID',
  },
  {
    accessorKey: 'lastName',
    header: '名字',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'createdAt',
    header: '登録日時(UNIX)',
    cell: ({ row }) => {
      const user = row.original;
      return format(new Date(user.createdAt), 'yyyy/MM/dd HH:mm', {
        locale: ja,
      });
    },
  },
  {
    accessorKey: 'createdAtStr',
    header: '登録日時(ISO時刻)',
  },
];
