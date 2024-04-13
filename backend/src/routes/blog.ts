import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    },
    Variables: {
      userId: string
    }
  }>();


  blogRouter.use('/*', async (c, next) => {
    //get header
    const authHeader = c.req.header('Authorization')
  
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

blogRouter.get('/:id', async(c) => {
	const id = c.req.param('id')
	const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })

	return c.json(post)
})

blogRouter.post('/', async (c) => {
  const userId = c.get('userId')
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json()

  const post = await prisma.post.create({
    data: {
        title: body.title,
        content: body.content,
        authorId: userId
    }
  });
  return c.json({
    id: post.id
  })
})

blogRouter.put('/', async (c) => {
    const userId = c.get('userId')
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json()

  const post = await prisma.post.update({
    where: {
        id: body.id,
        authorId: userId
    },
    data: {
        title: body.title,
        content: body.content
    }
  });
	return c.text('updated post')
})

//add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({})

    return c.json(posts)
})


export default blogRouter