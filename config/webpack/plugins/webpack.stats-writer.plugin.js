import { StatsWriterPlugin } from 'webpack-stats-plugin';
import omit from 'lodash/fp/omit';
import map from 'lodash/fp/map';

const omitNestedChunkProperties = omit(['origins', 'children', 'siblings']);

const omitNestedModuleProperties = omit([
  'issuer', 'issuerId', 'issuerName', 'issuerPath', 'reasons', 'providedExports', 'source', 'origins', 'optimizationBailout',
  'cacheable', 'optional', 'prefetched', 'usedExports', 'depth', 'size', 'identifier', 'failed', 'errors', 'warnings'
]);
const processModules = map((data) => {
  const modules = omitNestedModuleProperties(data);

  if (modules.modules) {
    modules.modules = processModules(modules.modules);
  }

  return modules;
});

const simplifyModules = (stats) => {
  /* eslint-disable no-param-reassign */
  if (Array.isArray(stats.chunks)) {
    stats.chunks = stats.chunks.map((chunk) => {
      chunk = omitNestedChunkProperties(chunk);
      chunk.modules = processModules(chunk.modules);

      return chunk;
    });
  }

  stats.modules = processModules(stats.modules);

  return stats;
  /* eslint-enable no-param-reassign */
};

export const statsWriterPlugin = () => (
  new StatsWriterPlugin({
    // relative to client output dir
    filename: '../server/stats/stats.json',
    // used only fields consumed by webpack-flush-chunks plugin
    fields: [
      'publicPath',
      'outputPath',
      'assetsByChunkName',
      'assets',
      'entrypoints',
      'namedChunkGroups',
      'chunks',
      'modules',
    ],
    transform(stats) {
      // reduce stats size by omitin fields that are not consumed by flush chunks
      const simplifiedStats = stats; // simplifyModules(stats);

      return JSON.stringify(simplifiedStats, null, 2);
    },
    stats: {
      all: true,
    },
  })
);
