import Router from "koa-router";
import posts from "./posts";
import auth from "./auth";
import tx from "./transaction";

const api = new Router();

api.use("/posts", posts.routes());
api.use("/auth", auth.routes());
api.use("/tx", tx.routes());

export default api;
