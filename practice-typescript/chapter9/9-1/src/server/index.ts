import Express from 'express'
import cors from 'cors'
import { Health } from '../types/api'

const app = Express()

// --------------------
// CORS対応
// --------------------
app.use(cors())

// --------------------
// Routing
// --------------------

app.get('/api/health', (req, res) => {
  const data: Health = { message: 'pong' }
  res.send(data)
})
app.use((req, res, next) => {
  res.sendStatus(404)
  next({ statusCode: 404 }) // 後続のミドルウェア関数に処理を移す。この時にステータスコードを付与
})
app.use(
  (
    err: { statusCode: number}, // 一つ上の処理で404のステータスコードが付与される
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    console.log(err.statusCode)
  }
)

// --------------------
// Express Serverの起動
// --------------------

const port = 8888
const host = 'localhost'

app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`)
})