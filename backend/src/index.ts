import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  //get header
  const authHeader = await c.req.header('Authorization')

  //check wether header even exist
  if(!authHeader || !authHeader.startsWith('bearer ')){
    c.status(403)
    return c.json({
      msg: "login error"
    })
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verify(token, c.env.JWT_SECRET)
    if(!decoded){
      c.status(401);
      return c.json({error: "unauthorized"})
    }
    c.set('userId', decoded.id)
  await next()
} catch (error) {
    c.status(403)
    c.json({
      msg: "authentication error"
    })
  }
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, //typescript error that it doesnt know type of env variable
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try {
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })
    const token = await sign({id: createdUser.id}, c.env.JWT_SECRET)
  
    return c.json({
      token: token
    })
    
  } catch (error) {
    c.status(403);
    return c.json({error: "error while signing up"})
  }
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, //typescript error that it doesnt know type of env variable
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if(!existingUser){
    c.status(403)
    return c.json({
      msg: "user does not exist"
    })
  }
  const token = await sign({id: existingUser.id}, c.env.JWT_SECRET)

	return c.json({
    token: token
  })
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {
  console.log(c.get('userId'));
  
	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app

//token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1NDA0ZjU5LTM0OGEtNGMxNy05MDI5LTljNGVjMDhlZWY4YyJ9.LHLbs5G3DWL6JCWsll6JhLd9j3MQjg17CuSw3to9LE8


