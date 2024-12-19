import { Provider, NodeConnector } from "./NodeConnector";

export class NodeBuilder {
  private _nodes: NodeConnector[];
  private providers: Provider[];

  constructor(providers: Provider[]) {
    this._nodes = [];
    this.providers = providers;
    this.init();
  }
  public get nodes(): NodeConnector[] { return this._nodes; }
  
  private async init():Promise<NodeConnector[]> {
    try {
      for (let i = 0; i < this.providers.length; i++) {
        this._nodes[i] = new NodeConnector(this.providers[i]);
        await this._nodes[i].init();
      }

      return this._nodes;
    } catch (err) {
      throw err;
    }
  }
}
