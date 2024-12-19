import { NodeBuilder } from "./NodeBuilder";

const init = () => {
  const builder = new NodeBuilder([
    {
      rpc: "wss://testnet-rpc.atleta.network",
      type: "websocket",
    },
    {
      rpc: "https://testnet-rpc.atleta.network",
      type: "http",
    },
  ]);

  //Promise.all(builder.nodes).then((result) =>  console.log('success'))
  


  
};


init();