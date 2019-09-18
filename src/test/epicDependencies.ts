import { IEpicDependencies } from '../modules/state-mgmt/rootState';

import { ApiServiceMock } from './ApiServiceMock';
import { NavigationServiceMock } from './NavigationServiceMock';
import { HelperServiceMock } from './HelperServiceMock';
import { LoggerMock } from './LoggerMock';
import { AsyncStorageServiceMock } from './AsyncStorageServiceMock';

export const getDeps = (): IEpicDependencies => ({
  apiService: new ApiServiceMock() as any,
  asyncStorageService: new AsyncStorageServiceMock() as any,
  navigationService: new NavigationServiceMock() as any,
  helperService: HelperServiceMock as any,
  logger: LoggerMock as any
});
