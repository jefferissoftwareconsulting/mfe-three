import "./db";
import { child, get, getDatabase, ref, set } from "firebase/database";
import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";
import cors from "@koa/cors";

const DEFAULT_CONFIG = {
  bgColor: "lightblue",
};

const app = new Koa();
app.context.dbRef = ref(getDatabase());

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.body = "MFE-1 server working";
  })
  .get("/config", async (ctx) => {
    ctx.body = DEFAULT_CONFIG;
  })
  .get("/config/:id", async (ctx) => {
    ctx.body = await get(child(ctx.dbRef, `config/${ctx.params.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return DEFAULT_CONFIG;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .put("/config/:id", async (ctx) => {
    const { name, bgColor } = ctx.request.body;
    if (!name || !bgColor) ctx.throw(400);

    const db = getDatabase();
    await set(ref(db, `config/${ctx.params.id}`), {
      name,
      bgColor,
    });

    ctx.body = { name, bgColor };
  });

app.use(cors()).use(koaBody()).use(router.routes());

app.listen(8001);
