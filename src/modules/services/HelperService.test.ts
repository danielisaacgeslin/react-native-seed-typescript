import { HelperService } from './HelperService';

describe('HelperService', () => {
  let expo;
  beforeEach(() => {
    expo = {
      Updates: {
        checkForUpdateAsync: jest.fn(),
        fetchUpdateAsync: jest.fn(),
        reloadFromCache: jest.fn()
      }
    };
    (HelperService as any).expo = expo;
  });

  describe('checkForUpdates', () => {
    it('should update the app when an update is available', async () => {
      expo.Updates.checkForUpdateAsync.mockResolvedValueOnce({ isAvailable: true });
      await HelperService.checkForUpdates();
    });

    it('should NOT update the app when an update is NOT available', async () => {
      expo.Updates.checkForUpdateAsync.mockResolvedValueOnce({ isAvailable: false });
      await HelperService.checkForUpdates();
      expect(expo.Updates.fetchUpdateAsync).toHaveBeenCalledTimes(0);
    });
  });
});
