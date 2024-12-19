import { ApiPromise, HttpProvider, WsProvider } from "@polkadot/api";

export type Provider = {
  rpc: WebSocketProvider | HttptProvider;
  type: ProviderType;
};

type ProviderType = "http" | "websocket";
type WebSocketProvider = "wss://testnet-rpc.atleta.network";
type HttptProvider = "https://testnet-rpc.atleta.network";

export class NodeConnector {
  private provider: HttpProvider | WsProvider;
  private api!: ApiPromise;

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

  public async init():Promise<ApiPromise> {
    try {
      this.api = await ApiPromise.create({ provider: this.provider });
      return this.api;
    } catch (error) {
      throw error;
    }
  }
}
