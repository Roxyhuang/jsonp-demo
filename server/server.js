const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  const req = ctx.request;
  const res = ctx.response;
  console.log(req.query);
  const data = { status: '1000', url: 'http://www.baidu.com' };
  if(req.query && req.query.callback) {
    const str =  req.query.callback + '(' + JSON.stringify(data) + ')'; //jsonp
    ctx.body = str;

  } else {
    ctx.body = JSON.stringify(data);
  }

});

app.listen(5000);