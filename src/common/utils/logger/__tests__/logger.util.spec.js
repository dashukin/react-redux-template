import pino from 'pino';
import Logger from '../logger.util';

jest.mock('pino');

describe('logger.util', () => {
  let mockPinoInstance;
  let mockPinoTrace;
  let mockPinoDebug;
  let mockPinoInfo;
  let mockPinoWarn;
  let mockPinoError;
  let mockPinoFatal;

  beforeEach(() => {
    mockPinoTrace = jest.fn();
    mockPinoDebug = jest.fn();
    mockPinoInfo = jest.fn();
    mockPinoWarn = jest.fn();
    mockPinoError = jest.fn();
    mockPinoFatal = jest.fn();
    mockPinoInstance = {};
    mockPinoInstance.trace = mockPinoTrace;
    mockPinoInstance.debug = mockPinoDebug;
    mockPinoInstance.info = mockPinoInfo;
    mockPinoInstance.warn = mockPinoWarn;
    mockPinoInstance.error = mockPinoError;
    mockPinoInstance.fatal = mockPinoFatal;
    pino.mockReturnValue(mockPinoInstance);
  });

  afterEach(() => {
    pino.mockClear();
  });

  describe('constructor', () => {
    it('should create pino logger instance', () => {
      jest.doMock('../logger.util');

      const mockLoggerOptions = {
        pretty: true,
      };
      const transformedOptions = Logger.transformToPinoProps(mockLoggerOptions);

      const logger = new Logger();

      expect(pino).toHaveBeenCalledWith(transformedOptions);
      expect(logger._logger).toBe(mockPinoInstance);
    });
  });

  describe('transformToPinoProps', () => {
    it('should transform logger options to pino properties', () => {
      const mockLoggerName = 'logger name';
      const loggerOptions = {
        pretty: true,
        name: mockLoggerName,
      };
      const expectedTransformedOptions = {
        prettyPrint: true,
        name: mockLoggerName,
      };

      const transformedOptions = Logger.transformToPinoProps(loggerOptions);

      expect(transformedOptions).toEqual(expectedTransformedOptions);
    });

    it('should return default pino options', () => {
      const transformedOptions = Logger.transformToPinoProps();
      const expectedTransformedOptions = {
        name: undefined,
        prettyPrint: true,
      };
      expect(transformedOptions).toEqual(expectedTransformedOptions);
    });
  });

  describe('log methods', () => {
    let logger;
    const logOptions = ['option1', 'option2'];

    beforeEach(() => {
      logger = new Logger();
    });

    it('should call pino.trace', () => {
      logger.trace(...logOptions);

      expect(mockPinoInstance.trace).toHaveBeenCalledWith(...logOptions);
    });

    it('should call pino.debug', () => {
      logger.debug(...logOptions);

      expect(mockPinoInstance.debug).toHaveBeenCalledWith(...logOptions);
    });

    it('should call pino.trace', () => {
      logger.info(...logOptions);

      expect(mockPinoInstance.info).toHaveBeenCalledWith(...logOptions);
    });

    it('should call pino.warn', () => {
      logger.warn(...logOptions);

      expect(mockPinoInstance.warn).toHaveBeenCalledWith(...logOptions);
    });

    it('should call pino.error', () => {
      logger.error(...logOptions);

      expect(mockPinoInstance.error).toHaveBeenCalledWith(...logOptions);
    });

    it('should call pino.fatal', () => {
      logger.fatal(...logOptions);

      expect(mockPinoInstance.fatal).toHaveBeenCalledWith(...logOptions);
    });
  });
});
