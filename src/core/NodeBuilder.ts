import { ApiPromise } from "@polkadot/api";
import { Provider, NodeAdapter } from "./NodeAdapter";

type Thread = {
  node: NodeAdapter;
  api: ApiPromise;
};

export abstract class NodeBuilder {
  public threads: Thread[];
  protected providers: Provider[];

  constructor(providers: Provider[]) {
    this.threads = [];
    this.providers = providers;
  }

  public async init(): Promise<void> {
    await this.execute(this.providers);
  }
  protected abstract execute(providers: Provider[]): Promise<void>;
}

export class OneNodeOneConnection extends NodeBuilder {
  public async execute(providers: Provider[]) {
    for (let i = 0; i < providers.length; i++) {
      const node = new NodeAdapter(providers[i]);
      const api = await ApiPromise.create({ provider: node.provider });

      this.threads.push({ node, api });
    }
  }
}

export class OneNodeMultiConnections extends NodeBuilder {
  public async execute(providers: Provider[]) {
    const connections = 10;

    for (let i = 0; i < providers.length; i++) {
      for (let z = 0; z < connections; z++) {
        const node = new NodeAdapter(providers[i]);
        const api = await ApiPromise.create({ provider: node.provider });

        this.threads.push({ node, api });
      }
    }
  }
}
