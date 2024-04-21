import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@aman.dev/common";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  //get header
  const authHeader = c.req.header("Authorization");

  //check wether header even exist
  if (!authHeader || !authHeader.startsWith("bearer ")) {
    c.status(403);
    return c.json({
      msg: "login error",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    c.status(403);
    return c.json({
      msg: "invalid token",
    });
  }

  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    if (!decoded) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", decoded.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({
      msg: "authentication error",
    });
  }
});

//add pagination
blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            //id or unique username
          },
        },
      },
    });

    return c.json({
      posts,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      msg: "error",
    });
  }
});



blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (post === null) {
    c.status(403);
    return c.json({
      msg: "this post does not exist",
    });
  }

  return c.json(post);
});

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    c.json({
      msg: "there was an error",
    });
  }
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  const post = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.text("updated post");
});

blogRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
 
  console.log("before delete");
  
  const deletedPost = await prisma.post.delete({
    where: {
      id: id,
    },
  });
  console.log("after delete");
  
  return c.json({
    "deletedPost": deletedPost,
    "message": "blog deleted"
  })
});



export default blogRouter;