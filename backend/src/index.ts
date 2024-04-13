import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import userRouter from './routes/user'
import blogRouter from './routes/blog'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)







export default app

//token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1NDA0ZjU5LTM0OGEtNGMxNy05MDI5LTljNGVjMDhlZWY4YyJ9.LHLbs5G3DWL6JCWsll6JhLd9j3MQjg17CuSw3to9LE8


