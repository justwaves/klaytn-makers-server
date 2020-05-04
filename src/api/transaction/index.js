import Router from "koa-router";
import * as txCtrl from "./tx.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const tx = new Router();

tx.get("/", txCtrl.list);
tx.post("/", checkLoggedIn, txCtrl.write);
// tx.delete("/", checkLoggedIn, txCtrl.checkOwnTx, txCtrl.remove);

export default tx;
