import { User } from './column';

const data: User[] = [
  {
    id: 1,
    lastName: 'クラメソ',
    firstName: '太郎',
    email: 'kurameso.taro@example.com',
    createdAt: 1707942107000,
    createdAtStr: '2024-02-14T20:21:47.000Z',
  },
  {
    id: 2,
    lastName: 'クラメソ',
    firstName: '花子',
    email: 'kurameso.hanako@example.com',
    createdAt: 1685079638000,
    createdAtStr: '2023-05-26T05:40:38.000Z',
  },
  {
    id: 3,
    lastName: 'くら',
    firstName: 'にゃん',
    email: 'kura.nyan@example.com',
    createdAt: 1705785298000,
    createdAtStr: '2024-01-20T21:14:58.000Z',
  },
];

export const getData: () => Promise<User[]> = async () => data;
