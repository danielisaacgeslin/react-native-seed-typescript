import { of } from 'rxjs';

export class AsyncStorageServiceMock {
  public setItem = jest.fn().mockReturnValue(of(null));
  public getItem = jest.fn().mockReturnValue(of({}));
  public removeItem = jest.fn().mockReturnValue(of(null));
}
