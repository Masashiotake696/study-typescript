import Express from 'express'
import { HttpError } from 'http-errors'
import { GET } from './get'
import { POST } from './post'
import { PUT } from './put'

// Expressモジュールに新しく型定義を追加する
declare module 'express' {
  interface RequestParams {
    query?: any
    params?: any
    body?: any
  }

  // Error (Genericsを追加したオーバーロードは失敗する)
  // interface Request<T extends RequestParams> {
  //   query: T['query']
  //   params: T['params']
  //   body: T['body']
  // }

  // Express.Request型を継承した新たな型を作成
  interface ExRequest<T extends RequestParams> extends Express.Request {
    query: T['query']
    params: T['params']
    body: T['body']
  }

  // res.sendを拡張するために設けたExResponse型
  interface ExResponse<T> extends Express.Response {
    send: (body?: T) => this
  }

  // エラーハンドル err?: HttpErrorを引数に取らなければならない指定
  interface ExNextFunction {
    (err?: HttpError): void
  }

  interface ExRequestHandler<T extends { req?: any; res?: any }> {
    (
      req: ExRequest<T['req']>,
      res: ExResponse<T['res']>,
      next: ExNextFunction
    ): any
  }

  interface Application {
    get: (<P extends keyof GET>(
      path: P,
      ...requestHandlers: ExRequestHandler<GET[P]>[]
    ) => any) & IRouterMatcher<this>
    post: (<P extends keyof POST>(
      path: P,
      ...requestHandlers: ExRequestHandler<POST[P]>[]
    ) => any) & IRouterMatcher<this>
    put: (<P extends keyof PUT>(
      path: P,
      ...requestHandlers: ExRequestHandler<PUT[P]>[]
    ) => any) & IRouterMatcher<this>
  }
}