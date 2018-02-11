const Koa = require('koa');
const xss = require('xss');
const app = new Koa();

app.use(async ctx => {
  const req = ctx.request;
  const res = ctx.response;
  console.log(req.query);
  const data = { status: '1000', url: 'http://www.baidu.com' };
  if(req.query && req.query.callback) {
    ctx.set('X-Content-Type-Options' , 'nosniff'); // 如果有设置设置阻止浏览器 MIME-sniffing，需要设置ctx.type
    ctx.type = 'text/javascript; charset=utf-8';
    const str =  req.query.callback + '(' + JSON.stringify(data) + ')'; // jsonp
    // 此处增加xss过滤，若没有xss过滤 访问 http://localhost:5000/?callback=%3Cscript%3Ealert(123)%3C/script%3E
    ctx.body = xss(str);

  } else {
    ctx.body = JSON.stringify(data);
  }

});

app.listen(5000);