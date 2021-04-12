import { expect, tap } from '@pushrocks/tapbundle';
import * as smarturl from '../ts/index';

let testSmarturl: smarturl.Smarturl;

tap.test('first test', async () => {
  testSmarturl = new smarturl.Smarturl();
  expect(testSmarturl).to.be.instanceOf(smarturl.Smarturl);
});

tap.test('should parse an URL', async () => {
  const parsedUrl = testSmarturl.parseUrl('https://lossless.com');
  console.log(parsedUrl);
});

tap.start();
