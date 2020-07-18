import Express from 'express'
import createError from 'http-errors'
import { Health } from '../types/api'

export default (app: Express.Application) => {
  // session.countの初期化middleware
  app.use((req, res, next) => {
    if (req.session !== undefined) {
      if (req.session.count === undefined || req.session.count === null) {
        req.session.count = 0
      }
    }
    next()
  })

  // 画面表示用ルート・ハンドラー
  app.get('/', (req, res, next) => {
    if (req.session && req.session.count !== undefined) {
      const data: { count: number } = { count: req.session.count }
      res.render('index.ejs', data)
      return
    }
    next(createError(401))
  })

  // pingボタン押下時のルート・ハンドラー
  app.get('/ping', (req, res, next) => {
    if (req.session && req.session.count !== undefined) {
      req.session.count++
      const data: Health = { message: 'pong', count: req.session.count }
      res.send(data)
      return
    }
    next(createError(401))
  })

  app.get('/user/greet/:id', (req, res, next) => {
    res.send({ message: `Hello, user ID: ${req.params.id}` })
  })
}