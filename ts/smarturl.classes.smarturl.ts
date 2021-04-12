import * as plugins from './smarturl.plugins';

export interface IUrlObject{
  href: string;
  origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  searchParams: any;
  hash: string;
}

export class Smarturl {
  public parseUrl(urlArg: string) {
    const parsedUrlInstance = new plugins.url.URL(urlArg);
    const parsedUrl: IUrlObject = {
      href: parsedUrlInstance.href,
      origin: parsedUrlInstance.origin,
      protocol: parsedUrlInstance.protocol,
      username: parsedUrlInstance.username,
      password: parsedUrlInstance.password,
      host: parsedUrlInstance.host,
      hostname: parsedUrlInstance.hostname,
      port: parsedUrlInstance.port,
      pathname: parsedUrlInstance.pathname,
      search: parsedUrlInstance.search,
      searchParams: parsedUrlInstance.searchParams,
      hash: parsedUrlInstance.hash,
    };
    if (!parsedUrl.port && parsedUrl.protocol === 'https:') {
      console.log(`inferring port 443 for "https:"`);
      parsedUrl.port = '443';
    }
    if (!parsedUrl.port && parsedUrl.protocol === 'http:') {
      console.log(`inferring port 80 for "http:"`);
      parsedUrl.port = '80';
    }
    return parsedUrl;
  }
}
