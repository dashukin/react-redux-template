import ProgressBarPlugin from 'webpackbar';

/**
 *
 * @param {String} [name]
 * @param {Boolean} production
 * @return {Object}
 */
export const progressBarPlugin = ({ name = 'Application', production } = {}) => {
  const mode = production ? 'prod' : 'dev';
  const logName = `${name} (${mode})`;

  return new ProgressBarPlugin({
    name: logName,
    minimal: production,
  });
};
