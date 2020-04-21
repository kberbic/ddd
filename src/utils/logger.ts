import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, prettyPrint, colorize, errors,
} = format;


const logger = createLogger({
  format: combine(
    errors({ stack: true, extend: true, correlationId: true }), // <-- use errors format
    timestamp(),
    prettyPrint({ colorize: true }),
    colorize({
      colors: {
        error: 'red',
      },
    }),
  ),
  transports: [new transports.Console()],
});

export default logger;
