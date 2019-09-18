import { Observable } from 'rxjs';

import { AsyncStorageService } from './AsyncStorageService';

jest.mock('@react-native-community/async-storage', () => ({}));

describe('AsyncStorageService', () => {
  let asyncStorage: AsyncStorageService;
  let storage;
  beforeEach(() => {
    asyncStorage = new AsyncStorageService();
    storage = storage = {
      setItem: jest.fn().mockResolvedValue(Promise.resolve()),
      getItem: jest.fn().mockReturnValue(Promise.resolve('{"a":1}')),
      removeItem: jest.fn().mockResolvedValue(Promise.resolve())
    };
    (asyncStorage as any).storage = storage;
  });

  it('should set an item', () => {
    const key = 'key';
    const item = { a: 1 };
    expect(asyncStorage.setItem(key, item) instanceof Observable).toBe(true);
    expect(storage.setItem).toBeCalledWith(key, '{"a":1}');
  });

  it('should get an item', done => {
    const key = 'key';
    asyncStorage.getItem(key).subscribe(item => {
      expect(storage.getItem).toBeCalledWith(key);
      expect(item).toEqual({ a: 1 });
      done();
    });
  });

  it('should remove an item', () => {
    const key = 'key';
    expect(asyncStorage.removeItem(key) instanceof Observable).toBe(true);
    expect(storage.removeItem).toBeCalledWith(key);
  });
});
