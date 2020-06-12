require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import serve from "koa-static";
import path from "path";
import send from "koa-send";
import cors from "@koa/cors";

import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";

const { PORT, MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(e => {
    console.log(e);
  });

const app = new Koa();
const router = new Router();

// CORS 설정
const corsOptions = {
  origin: "https://klaytnmakers.netlify.app",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// api route 적용
router.use("/api", api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 router 적용
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(
  __dirname,
  "../../klaytn-makers-client/build",
);
app.use(serve(buildDirectory));
app.use(async ctx => {
  if (ctx.status === 404 && ctx.path.indexOf("/api") !== 0) {
    await send(ctx, "index.html", { root: buildDirectory });
  }
});

// 20분에 한 번씩 서버 호출
// setInterval(() => {
//   http.get("https://klaytn-makers-server.herokuapp.com");
// }, 1200000);

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
