'use strict';

const koa = require('koa');
const Router = require('koa-router');
const { join } = require('path');

require('./boot/connect-mongodb.js');
const Items = require('./models/Items.js');

const app = new koa();
const router = new Router();

app.use(require('koa-static')(join(__dirname, '../static')));

router.get('/items', async (ctx, next) => {
  const condition = {};

  if(ctx.query.key) {
    const regex = new RegExp(`.*?${ctx.query.key}.*?`);

    condition.title = condition.detail = {
      $regex: regex
    };
  }

  ctx.body = {
    code: 200,
    data: await Items.find(condition).exec()
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(6002, () => {
  console.log('listen on port 6002!');
});
