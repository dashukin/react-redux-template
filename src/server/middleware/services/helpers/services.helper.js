import url from 'url';

export const createServerSideLocation = (req) => {
  const requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const parsedUrl = url.parse(requestUrl);

  const location = {
    hash: parsedUrl.hash || '',
    host: parsedUrl.host,
    hostname: parsedUrl.hostname,
    href: parsedUrl.href,
    origin: `${parsedUrl.protocol}//${parsedUrl.host}`,
    pathname: parsedUrl.pathname,
    port: parsedUrl.port,
    protocol: parsedUrl.protocol,
    search: parsedUrl.search || '',
  };

  return location;
};
