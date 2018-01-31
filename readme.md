## Mini Express

### 极简的 Express 风格服务器，仅实现了路由池和中间件功能。

```javascript

// 模块导出 MiniExpress 类。

// 实例化
const app = new MiniExpress()

// 监听目标路由上的请求
app.get('/', (req, res) => {
  res.end('This is index.')
})

// 添加中间件
app.use('/secret', (req, res) => {
  if (/* 校验通过 */) {
    next()
  } else {
    res.writeHead(404, {'Content-Type': 'text/htmlcharset=utf-8'})
    res.end('对不起，你没有相应权限')
  }
})
app.get('/secret', (req, res) => {
  res.end('Secret!')
})

// 并未实现静态文件服务和 Request、Response 等对象的扩展。

```
