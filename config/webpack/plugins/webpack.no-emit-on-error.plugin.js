import webpack from 'webpack';

export const noEmitOnErrorPlugin = () => (
	new webpack.NoEmitOnErrorsPlugin()
);