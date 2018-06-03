import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export const progressBarPlugin = () => (
	new ProgressBarPlugin({
		format: '  build [:bar] :percent (:elapsed seconds)',
		clear: false,
	})
);