import { of } from 'rxjs';

import { getTodo_1, getLoginResponse, getUser_1, getPaginationOf } from './entities';

export class ApiServiceMock {
  public login = jest.fn().mockReturnValue(of(getLoginResponse()));
  public setToken = jest.fn();
  public getUserList = jest.fn().mockReturnValue(of(getPaginationOf(getUser_1())));
  public getTodoList = jest.fn().mockReturnValue(of(getPaginationOf(getTodo_1())));
}
