import { GeneralModel, UserModel, TodoModel } from '../modules/models';
import { IRootState } from '../modules/state-mgmt/rootState';
import { authState } from '../modules/state-mgmt/auth';
import { userState } from '../modules/state-mgmt/user';
import { todoState } from '../modules/state-mgmt/todo';

export const getPaginationOf = (entity: any): GeneralModel.IPagination<any> => ({
  count: 1,
  page: 1,
  limit: 1,
  totalPages: 1,
  docs: [entity]
});

export const getUser_1 = (): UserModel.IUser => ({
  _id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
  email: 'dgeslin@opyacare.com',
  name: 'Daniel Geslin',
  firstname: 'Daniel ',
  lastname: 'Geslin',
  nickname: 'dgeslin',
  avatar: 'https://lh4.googleusercontent.com/-WUY2PDwnKZk/AAAAAAAAAAI/AAAAAAAAAAc/1UMlOKImKRA/photo.jpg',
  picture: 'https://s.gravatar.com/avatar/8e5ef526703b1e38f75cba07ec2c3604?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdg.png',
  gender: null,
  location: 'sf',
  role: 'general',
  lastOnline: '2018-08-27',
  forcedStatus: UserModel.ForcedStatus.AVAILABLE,
  status: UserModel.Status.ONLINE,
  createdAt: '2018-05-21',
  updatedAt: '2018-08-27'
});

export const getTodo_1 = (): TodoModel.ITodo => ({
  _id: '6521x-9164e4c4-6521-97fd-9164e4c4-47bb',
  createdById: getUser_1()._id,
  title: 'i am a todo',
  description: 'i am a todo description',
  status: TodoModel.Status.PENDING,
  createdAt: '2018-05-11',
  updatedAt: '2018-08-27'
});

export const getTodo_2 = (): TodoModel.ITodo => ({
  _id: '9164e4c4-6521x-6521-97fd-47bb-9164e4c4',
  createdById: getUser_1()._id,
  title: 'i am a todo 2',
  description: 'i am a todo description 2',
  status: TodoModel.Status.PENDING,
  createdAt: '2018-05-12',
  updatedAt: '2018-08-27'
});

export const getTodo_3 = (): TodoModel.ITodo => ({
  _id: '9164e4c4-6521x-6521-97fd-47bb-9164e4c4',
  createdById: getUser_1()._id,
  title: 'i am a todo 3',
  description: 'i am a todo description 3',
  status: TodoModel.Status.PENDING,
  createdAt: '2018-05-10',
  updatedAt: '2018-08-27'
});

export const getTodo_4 = (): TodoModel.ITodo => ({
  _id: '9164e4c4-9164e4c4-6521-47bb-6521x-97fd',
  createdById: getUser_1()._id,
  title: 'i am a todo 3',
  description: 'i am a todo description 3',
  status: TodoModel.Status.PENDING,
  createdAt: '2018-05-13',
  updatedAt: '2018-08-27'
});

export const getLoginResponse = (): GeneralModel.ILoginResponse => ({
  ...getUser_1(),
  access_token: 'i-am-an-access-token'
});

export const getInitialState = (): IRootState => ({
  auth: { ...authState.initialState },
  user: { ...userState.initialState },
  todo: { ...todoState.initialState }
});

export const getState = (): IRootState => ({
  auth: { currentUserId: getUser_1()._id, isLoading: false, hasError: false },
  user: { userMap: { [getUser_1()._id]: getUser_1() } },
  todo: { todoMap: { [getTodo_1()._id]: getTodo_1(), [getTodo_2()._id]: getTodo_2(), [getTodo_3()._id]: getTodo_3(), [getTodo_4()._id]: getTodo_4() } }
});
