import Express from 'express'
import createError, { HttpError } from 'http-errors' // https://github.com/jshttp/http-errors

export default (app: Express.Application) => {
  app.use((req, res, next) => {
    // レンダリングするテンプレートを指定。テンプレートはapp.set('views', ...)で指定したディレクトリに格納する（今回は/src/public）
    res.render('404.ejs')
    // 404エラーでメッセージを生成してnextに渡す
    next(createError(404)) // (alias) createError(...args: createError.UnknownError[]): createError.HttpError
  })
  app.use(
    (
      err: HttpError,
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      console.log(err.statusCode)
    }
  )
}