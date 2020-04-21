/* eslint-disable */
import * as path from 'path';
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const main = path.resolve(path.dirname(require.main.filename), '../../');
require('dotenv').config({ path: path.resolve(main, `./.env.${process.env.NODE_ENV}`) });
