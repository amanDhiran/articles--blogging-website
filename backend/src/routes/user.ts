import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  sign, verify } from "hono/jwt";
import { signinInput, signupInput } from '@aman.dev/common'

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, //typescript error that it doesnt know type of env variable
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if(!success){
    c.status(400)
    return c.json({error: "invalid input"})
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: createdUser.id }, c.env.JWT_SECRET);

    return c.json({
      token: token,
    });
  } catch (error) {
    c.status(403);
    
    return c.json({ error: `error while signing up ${error}`  });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, //typescript error that it doesnt know type of env variable
  }).$extends(withAccelerate());

  const body = await c.req.json();
  
  const { success } = signinInput.safeParse(body);

  if(!success){
    c.status(400)
    return c.json({error: "invalid input"})
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!existingUser) {
    c.status(403);
    return c.json({
      msg: "user does not exist",
    });
  }
  const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);

  return c.json({
    token: token,
  });
});

userRouter.get('/me', async(c) => {
  const authHeader = c.req.header('Authorization')
  
    //check wether header even exist
    if(!authHeader || !authHeader.startsWith('bearer ')){
      c.status(403)
      return c.json({
        msg: "user is not authenticated error"
      })
    }
    const token = authHeader.split(' ')[1];

    if(!token){
      c.status(403)
      return c.json({
        msg: "invalid token"
      })
    }
  
    try {
      const decoded = await verify(token, c.env.JWT_SECRET)
      if(decoded){
        return c.json({
          isLoggedIn: true,
                message: "user is logged in"
        })
      }
  } catch (error) {
      c.status(403)
      c.json({
        isLoggedIn: false,
          message: "user is not authenticated"
      })
    }
})

export default userRouter;
