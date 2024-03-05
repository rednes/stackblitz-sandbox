import { ColumnDef } from '@tanstack/react-table';

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
    accessorKey: 'id',
    header: 'ID',
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
    header: '登録日時(UNIX)',
  },
  {
    accessorKey: 'createdAtStr',
    header: '登録日時(ISO時刻)',
  },
];
