import universal from 'react-universal-component';

const LoadableHomePage = universal(import('./home.container.js'), {
  // TODO: specify loading options
});

export default LoadableHomePage;
