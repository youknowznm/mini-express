const http = require('http')
const url = require('url')

class MiniExpress {
  constructor() {
    this.routes = []
    const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'options', 'all']
    HTTP_METHODS.forEach((method) => {
      this[method] = (path, fn) => {
        this.routes.push({method, path, fn})
      }
    })
    this.requestListener = this.requestListener.bind(this)
  }
  getRouter (targetMethod, targetPath) {
    const lazy = function* (arr) {
      yield* arr
    }
    const lazyRoutes = lazy(this.routes)
    return (req, res) => {
      ;(function next () {
        const thisRoute = lazyRoutes.next().value
        // 1 - 已经遍历结束
        if (thisRoute === undefined) {
          res.end(`Cannot ${targetMethod} ${targetPath}`)
          return
        }
        const {method, path, fn} = thisRoute
        // 2 - 匹配到了符合的路由
        if ([targetMethod, 'all'].includes(method) && [targetPath, '*'].includes(path)) {
          fn(req, res)
          return
        }
        // 3 - 匹配到了中间件
        if (method === 'use' && [targetPath, '/'].includes(path)) {
          fn(req, res, next)
          return
        }
        next()
      }())
    }
  }
  // 定义对所有请求的监听函数，用作 http.createServer() 的参数
  requestListener (req, res) {
    const method = req.method.toLowerCase()
    const pathname = url.parse(req.url).pathname
    this.getRouter(method, pathname)(req, res)
  }
  listen(port = 4000, host = 'localhost') {
    http
      .createServer(this.requestListener)
      .listen(port, host, () => {
        console.log(`### Mini-express running at ${host}\:${port}. ###`)
      })
  }
  use(path, fn) {
    this.routes.push({method: 'use', path, fn})
  }
}

module.exports = MiniExpress
