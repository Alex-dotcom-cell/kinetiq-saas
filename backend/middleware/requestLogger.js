import morgan from 'morgan';

// Custom morgan format
const customFormat = ':method :url :status :res[content-length] - :response-time ms';

export const requestLogger = morgan(customFormat);

export default requestLogger;
