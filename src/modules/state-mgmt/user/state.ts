import { UserModel } from '../../models';
import { IEntityMap } from '../../../types';

export interface IState {
  userMap: IEntityMap<UserModel.IUser>;
}

export const initialState = {
  userMap: {}
};
