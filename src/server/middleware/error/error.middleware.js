// eslint-disable-next-line no-unused-vars
const errorMiddleware = ({ logger }) => (err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Error');
};

export default errorMiddleware;
