import universal from 'react-universal-component';

const LoadableNotFoundPage = universal(import('./not-found.container.js'), {
  // TODO: specify loading options
});

export default LoadableNotFoundPage;
