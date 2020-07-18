import Express from 'express'
import session from 'express-session' // https://github.com/expressjs/session
import connectRedis from 'connect-redis' // https://github.com/tj/connect-redis
import redis from 'redis'
import { REDIS_HOST, REDIS_PORT } from '../constants'

export default (app: Express.Application) => {
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()
  const option = {
    store: new RedisStore({
      client: redisClient,
      host: REDIS_HOST,
      port: REDIS_PORT
    }),
    secret: 'keyboard cat',
    resave: false
  }
  app.use(session(option))
}