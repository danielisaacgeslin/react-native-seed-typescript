import AsyncStorage from '@react-native-community/async-storage';
import { Observable, from, throwError } from 'rxjs';
import { map, timeoutWith } from 'rxjs/operators';

import { ENV } from '../../constants';
import { Logger } from './Logger';
import { safeParse } from '../../utils/generalUtils';

export class AsyncStorageService {
  private storage = AsyncStorage;

  public setItem(key: string, item: any): Observable<void> {
    Logger.log(`storage: setting ${key}:`, item);
    return from(this.storage.setItem(key, JSON.stringify(item))).pipe(
      timeoutWith(ENV.STORAGE_TIMEOUT, throwError(new Error(`storage: timeout setting ${key}`)))
    ) as any;
  }

  public getItem<T>(key: string): Observable<T> {
    Logger.log(`storage: getting ${key}`);
    return from(this.storage.getItem(key)).pipe(
      timeoutWith(ENV.STORAGE_TIMEOUT, throwError(new Error(`storage: timeout getting ${key}`))),
      map(item => safeParse(item))
    );
  }

  public removeItem(key: string): Observable<void> {
    Logger.log(`storage: removing ${key}`);
    return from(this.storage.removeItem(key)).pipe(timeoutWith(ENV.STORAGE_TIMEOUT, throwError(new Error(`storage: timeout setting ${key}`))));
  }
}
