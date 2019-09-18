import { Logger } from './Logger';

export abstract class HelperService {
  public static async checkForUpdates(): Promise<void> {
    Logger.log('Checking for updates...');
  }
}
