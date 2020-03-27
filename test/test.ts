import { expect, tap } from '@pushrocks/tapbundle';
import * as smarturl from '../ts/index';

tap.test('first test', async () => {
  console.log(smarturl.standardExport);
});

tap.start();
