import { Provider, Substrate } from "./Substrate";


export class NodeBuilder {
  nodes: {
    [key: number]: Substrate
  };

  constructor() {
    this.nodes = {}
  }

  async init (providers: Provider[]) {
    
    for(let i = 0; i < providers.length; i++ ) {
      this.nodes[i] = new Substrate(providers[i]);
      this.nodes[i].init();
    }
  }
}


