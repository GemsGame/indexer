import { HttpProvider, WsProvider } from "@polkadot/api";

export type Provider = {
  rpc: WebSocketProvider | HttptProvider;
  type: ProviderType;
};

export type ProviderType = "http" | "websocket";
export type WebSocketProvider = "wss://testnet-rpc.atleta.network";
export type HttptProvider = "https://testnet-rpc.atleta.network";

export class NodeAdapter {
  public provider: HttpProvider | WsProvider;

  constructor(provider: Provider) {
    switch (provider.type) {
      case "http": {
        this.provider = new HttpProvider(provider.rpc);
        break;
      }
      case "websocket": {
        this.provider = new WsProvider(provider.rpc);
        break;
      }
      default: {
        throw new Error("Invalid provider type");
      }
    }
  }
}
