import * as plugins from './smarturl.plugins';

export class Smarturl {
  public parseUrl(urlArg: string) {
    return plugins.url.parse(urlArg);
  }
}
