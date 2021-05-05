# Mini Express

极简的 express 风格服务器, 实现了路由池, 中间件和对请求及响应的部分增强.

```bash
$ npm run test
```

```javascript
const MiniExpress = require('../mini-express')

// 实例化一个 MiniExpress 对象
const app = new MiniExpress()

// 监听根路由的的 GET 请求
app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  res.end('这是首页。')
})

// 添加一个中间件，它不允许 '/no-query-allowed' 路由出现任何查询字符串
app.use('/no-query-allowed', (req, res, next) => {
  if (JSON.stringify(req.query) !== '{}') {
    res.writeHead(403, {'Content-Type': 'text/html;charset=utf-8'})
    res.end('这个路由不允许出现查询字符串。')
  } else {
    next()
  }
})
app.get('/no-query-allowed', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  res.end('很好！你没有键入查询字符串。')
})

app.listen()
```
