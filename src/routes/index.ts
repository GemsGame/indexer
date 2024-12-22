import Router from "express";
import { addAddressToList, getAddressInfoByBlock } from "../controllers/balances";

const router = Router();

router.get("/balances/:address/:block_no", getAddressInfoByBlock);
router.post("/balances/:address", addAddressToList);

export default router;
