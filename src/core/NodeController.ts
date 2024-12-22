import { OneNodeOneConnection, OneNodeMultiConnections } from "./NodeBuilder";
import { NodeKeeper } from "./NodeKeeper";

class NodeController {
  strategy: OneNodeOneConnection | OneNodeMultiConnections;
  keeper: NodeKeeper;

  constructor(
    strategy: OneNodeOneConnection | OneNodeMultiConnections,
    keeper: NodeKeeper
  ) {
    this.strategy = strategy;
    this.keeper = keeper;
  }

  public async init() {
    try {
      await this.strategy.init();
    } catch (error) {
      throw error;
    }
  }
}

export const controller = new NodeController(
  new OneNodeOneConnection([
    {
      rpc: "wss://testnet-rpc.atleta.network",
      type: "websocket",
    },
    {
      rpc: "https://testnet-rpc.atleta.network",
      type: "http",
    },
  ]),
  new NodeKeeper()
);

controller.init();
