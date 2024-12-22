import Router from "express";
import { addAddressToList, getAddressBalanceByBlock } from "../controllers/balances";

const router = Router();

router.get("/balances/:address/:block_no", getAddressBalanceByBlock);
router.post("/balances/:address", addAddressToList);

export default router;
