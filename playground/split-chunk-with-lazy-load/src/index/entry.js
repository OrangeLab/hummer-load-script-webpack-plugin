import * as Tenon from '@hummer/tenon-vue';
import app from './app';
import webAPI from '@hummer/web-api'
webAPI.install()

Tenon.render(app);
