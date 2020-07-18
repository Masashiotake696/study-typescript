import Express from 'express'
import config from './config'
import session from './session'
import webpack from './webpack'
import routes from './routes'
import error from './error'
import listen from './listen'

const app = Express()

config(app) // Expressサーバーの基本的な設定を行う
session(app) // Session middleware（Redisクライアント）の設定を行う
webpack(app) // webpack middlewareの設定を行う
routes(app) // ルート・ハンドラーの設定を行う
error(app) // エラーログなどの設定を行う
listen(app) // サーバーを起動する