import { expect, tap } from '@pushrocks/tapbundle';
import * as smarturl from '../ts/index';

let testSmarturl: smarturl.Smarturl;

tap.test('first test', async () => {
  testSmarturl = new smarturl.Smarturl();
  expect(testSmarturl).to.be.instanceOf(smarturl.Smarturl);
});

tap.test('should parse an URL', async () => {
  const testUrl = 'https://lossless.com:3000/?some=cool&more=yes';
  // const urlMod = await import('url');
  // const altParsed = urlMod.parse(testUrl);
  // console.log(altParsed);
  const parsedUrl = smarturl.Smarturl.createFromUrl(testUrl, {
    searchParams: {
      more: 'overwritten'
    }
  });
  console.log(parsedUrl);
  console.log(parsedUrl.toString());
});

tap.start();
