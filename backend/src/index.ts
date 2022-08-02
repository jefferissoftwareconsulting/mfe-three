import "./db";
import { child, get, getDatabase, ref, set } from "firebase/database";
import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";
import cors from "@koa/cors";

const app = new Koa();
app.context.dbRef = ref(getDatabase());

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.body = "MFE-1 server working";
  })
  .get("/settings", async (ctx) => {
    ctx.body = await get(child(ctx.dbRef, `settings/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .put("/settings", async (ctx) => {
    const { bgColor } = ctx.request.body;
    if (!bgColor) ctx.throw(400);

    const db = getDatabase();
    set(ref(db, "settings/"), {
      bgColor,
    });

    ctx.body = { bgColor };
  });

app.use(cors()).use(koaBody()).use(router.routes());

app.listen(8001);
