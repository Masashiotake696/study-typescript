import path from 'path'
import Express from 'express'
import cookieParser from 'cookie-parser' // https://github.com/expressjs/cookie-parser
import bodyParser from 'body-parser' // https://github.com/expressjs/body-parser

export default (app: Express.Application) => {
  // 静的ファイルのホスティングディレクトリを指定
  app.use(Express.static(path.join(__dirname, '../public')))
  // ViewにEJSを利用することを宣言
  app.set('view engine', 'ejs')
  // .ejsが置かれるディレクトリを指定
  app.set('views', path.join(__dirname, '../client'))

  // body-parserを利用
  app.use(bodyParser.urlencoded({ extended: true }))
  // cookie-parserを利用
  app.use(cookieParser())
}