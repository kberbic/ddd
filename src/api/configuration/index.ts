/* eslint-disable */
import * as path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const main = path.resolve(path.dirname(require.main.filename), '../../');
if (process.env.NODE_ENV === 'local') require('dotenv').config({ path: path.resolve(main, `./.env.${process.env.NODE_ENV}`) });
else if (process.env.NODE_ENV === 'test.local') require('dotenv').config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) });
