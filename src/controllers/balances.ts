import { Request, Response } from "express";
import { controller } from "../core/NodeController";

export const addAddressToList = async (
  request: Request<{ address: string }>,
  response: Response
): Promise<void> => {
  try {
    await controller.keeper.addAddress(request.params.address);
    response
      .status(200)
      .send(`Address ${request.params.address} added successfully`);
  } catch (error) {
    if (error instanceof Error) {
      response.status(404).json({ error: error.message });
    } else {
      response.status(400).json({ error: "unknown" });
    }
  }
};

export const getAddressBalanceByBlock = async (
  request: Request<{ address: string; block_no: number }>,
  response: Response
) => {
  const { block_no, address } = request.params;

  try {
    const blockHash = await controller.keeper.getBlockHash(
      block_no,
      controller.strategy.threads[0].api
    );
    const accountInfo = await controller.keeper.getAccountState(
      blockHash,
      address,
      controller.strategy.threads[Math.floor(Math.random() *  controller.strategy.threads.length)].api
    );

    await controller.keeper.addNewBlock(blockHash, block_no);

    response
      .status(200)
      .send(accountInfo);

  } catch (error) {
    if (error instanceof Error) {
      response.status(404).json({ error: error.message });
    } else {
      response.status(400).json({ error: "unknown" });
    }
  }
};
