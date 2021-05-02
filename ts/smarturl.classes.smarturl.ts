import * as plugins from './smarturl.plugins';

export interface IUrlObject {
  href: string;
  origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  path: string;
  pathname: string;
  search: string;
  searchParams: ISearchParams;
  hash: string;
}

export interface ISearchParams {
  [key: string]: string;
}

export class Smarturl implements IUrlObject {
  public static createFromUrl(
    urlArg: string,
    optionsArg?: {
      searchParams?: ISearchParams;
    }
  ): Smarturl {
    const parsedUrlInstance = new plugins.url.URL(urlArg);
    const searchParams: ISearchParams = {};

    // enrichment
    const searchParamKeys = parsedUrlInstance.searchParams.keys();
    for (const key of searchParamKeys) {
      searchParams[key] = parsedUrlInstance.searchParams.get(key);
    }
    if (optionsArg?.searchParams) {
      for (const key of Object.keys(optionsArg.searchParams)) {
        searchParams[key] = optionsArg.searchParams[key];
      }
    }

    let path = parsedUrlInstance.pathname;
    if (Object.keys(searchParams).length > 0) {
      path += '?';
      let first = true;
      for(const key of Object.keys(searchParams)) {
        if (first) {
          first = false;
        } else {
          path += '&';
        }
        path += `${key}=${searchParams[key]}`;
      }
    }

    const parsedUrl: IUrlObject = {
      href: parsedUrlInstance.href,
      origin: parsedUrlInstance.origin,
      protocol: parsedUrlInstance.protocol,
      username: parsedUrlInstance.username,
      password: parsedUrlInstance.password,
      host: parsedUrlInstance.host,
      hostname: parsedUrlInstance.hostname,
      port: parsedUrlInstance.port,
      path,
      pathname: parsedUrlInstance.pathname,
      search: parsedUrlInstance.search,
      searchParams,
      hash: parsedUrlInstance.hash,
    };

    if (!parsedUrl.port && parsedUrl.protocol === 'https:') {
      // console.log(`inferring port 443 for "https:"`);
      parsedUrl.port = '443';
    }
    if (!parsedUrl.port && parsedUrl.protocol === 'http:') {
      // console.log(`inferring port 80 for "http:"`);
      parsedUrl.port = '80';
    }
    const returnSmarturl = new Smarturl();
    Object.assign(returnSmarturl, parsedUrl);
    return returnSmarturl;
  }
  public static createFromParsedUrl(parsedUrlArg: IUrlObject) {
    const returnSmarturl = new Smarturl();
    Object.assign(returnSmarturl, parsedUrlArg);
    return returnSmarturl;
  }

  // INSTANCE
  href: string;
  origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  path: string;
  pathname: string;
  search: string;
  searchParams: ISearchParams;
  hash: string;

  constructor() {}

  toString() {
    return `${this.protocol}//${this.hostname}:${this.port}${this.path}`
  }
}
