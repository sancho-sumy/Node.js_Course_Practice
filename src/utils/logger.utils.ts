import logger, { Logger } from 'pino';

const log: Logger = logger({
    level: process.env.LOG_LEVEL ?? 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'hostname,pid',
        },
    },
});

export default log;
