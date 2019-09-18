import { ENV } from '../../constants';

export abstract class Logger {
  private static shouldLog = !ENV.IS_TEST;
  private static printer = console;

  public static log = (...args) => Logger.logMethod('log', ...args);
  public static info = (...args) => Logger.logMethod('info', ...args);
  public static warn = (...args) => Logger.logMethod('warn', ...args);
  /* istanbul ignore next line */
  public static error = (...args) => Logger.logMethod(ENV.IS_PROD ? 'error' : 'warn', ...args); /** console.error pops up read scary messages using devtools */
  public static table = (...args) => Logger.logMethod('table', ...args);

  private static logMethod = (level, ...args) => {
    /* istanbul ignore next line */
    if (!Logger.shouldLog) return; // we don't want to cover the line that disables logs on the test env
    Logger.printer[level](...args);
  };
}
