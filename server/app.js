'use strict';
//原声包
const { join } = require('path');
//第三方包
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
//自建包
require('./boot/connect-mongodb.js');
const Items = require('./models/Items.js');

const app = new koa();
const router = new Router();

app.use(bodyParser());
app.use(require('koa-static')(join(__dirname, '../static')));

router.get('/items', async (ctx, next) => {
	const keys = ctx.query.key.split(' ').filter(key => key);
	const $or = [];

	for(let key of keys) {
		const $regex = new RegExp(`.*?${key}.*?`);
		$or.push({
			detail: {
				$regex
			}
		});
		$or.push({
			title: {
				$regex
			}
		});
	}

  ctx.body = {
    code: 200,
    data: await Items.find({$or}).exec()
  };
});

router.post('/item', async(ctx, next) => {
	const { title, detail } = ctx.request.body;
	const item = new Items({ title, detail });
	await item.save();
	ctx.body = {
		code: 200,
		msg: '操作成功'
	};
});

router.del('/item/:id', async(ctx, next) => {
	const _id = ctx.params.id;
	await Items.remove({_id}).exec();
	ctx.body = {
		code: 200,
		msg: '操作成功'
	};
});

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
