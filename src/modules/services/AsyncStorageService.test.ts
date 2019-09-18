import { Observable } from 'rxjs';

import { AsyncStorageService } from './AsyncStorageService';

describe('AsyncStorageService', () => {
  let asyncStorage: AsyncStorageService;
  let storage;
  beforeEach(() => {
    asyncStorage = new AsyncStorageService();
    storage = storage = {
      setItemAsync: jest.fn().mockResolvedValue(Promise.resolve()),
      getItemAsync: jest.fn().mockReturnValue(Promise.resolve('{"a":1}')),
      deleteItemAsync: jest.fn().mockResolvedValue(Promise.resolve())
    };
    (asyncStorage as any).storage = storage;
  });

  it('should set an item', () => {
    const key = 'key';
    const item = { a: 1 };
    expect(asyncStorage.setItem(key, item) instanceof Observable).toBe(true);
    expect(storage.setItemAsync).toBeCalledWith(key, '{"a":1}');
  });

  it('should get an item', done => {
    const key = 'key';
    asyncStorage.getItem(key).subscribe(item => {
      expect(storage.getItemAsync).toBeCalledWith(key);
      expect(item).toEqual({ a: 1 });
      done();
    });
  });

  it('should remove an item', () => {
    const key = 'key';
    expect(asyncStorage.removeItem(key) instanceof Observable).toBe(true);
    expect(storage.deleteItemAsync).toBeCalledWith(key);
  });
});
