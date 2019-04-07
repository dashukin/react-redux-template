import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { APP_SRC_FAVICON_ENTRY } from '../../environment';

/**
 * @see https://github.com/itgalaxy/favicons#usage
 */

export const faviconsPlugin = () => (
	new FaviconsWebpackPlugin({
		logo: APP_SRC_FAVICON_ENTRY,
		prefix: 'icons-[hash]/',
		emitStats: false,
		statsFilename: 'iconstats-[hash].json',
		persistentCache: true,
		inject: true,
		background: '#fff',
		icons: {
			android: true,
			appleIcon: true,
			appleStartup: false,
			coast: false,
			favicons: true,
			firefox: true,
			opengraph: false,
			twitter: false,
			yandex: false,
			windows: false
		}
	})
);
