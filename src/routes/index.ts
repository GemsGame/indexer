import Router, {Express} from "express";

const router:Express = Router();

router.get("/balances/:address/:block_no");
router.post("/balances/:address");


export default router;