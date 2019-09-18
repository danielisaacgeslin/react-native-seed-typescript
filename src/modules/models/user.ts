export enum Status {
  ONLINE = 'online',
  OFFLINE = 'offline',
  INACTIVE = 'inactive'
}

export enum ForcedStatus {
  AVAILABLE = 'available',
  SESSION = 'in-session',
  BUSY = 'busy',
  AWAY = 'away'
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  nickname: string;
  avatar: string;
  picture: string;
  gender: string;
  location: string;
  role: string;
  firstname: string;
  lastname: string;
  lastOnline?: Date | string;
  status: Status;
  forcedStatus: ForcedStatus;
  createdAt: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export const getFallbackUser = (): IUser => ({
  _id: null,
  avatar: 'https://www.fluigent.com/wp-content/uploads/2018/07/default-avatar-BW.png',
  picture: 'https://www.fluigent.com/wp-content/uploads/2018/07/default-avatar-BW.png',
  email: '...',
  nickname: '...',
  gender: '...',
  location: '...',
  lastOnline: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  name: '...',
  firstname: '...',
  lastname: '...',
  role: '...',
  status: Status.OFFLINE,
  forcedStatus: ForcedStatus.AVAILABLE
});
