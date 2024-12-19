import { ApiPromise, HttpProvider, WsProvider } from "@polkadot/api";
import { AccountInfo, BlockHash } from "@polkadot/types/interfaces";
import { Codec } from "@polkadot/types/types";
import fs from "fs";


export type Provider = {
  rpc: WebSocketProvider | HttptProvider;
  type: ProviderType;
};

type AddressTable = {
  [key: string]: {
    date: number;
  };
};

type BlocksTable = AddressTable & {
  [key: string]: {
    blockHash: BlockHash;
  };
};

type ProviderType = "http" | "websocket";
type WebSocketProvider = "wss://testnet-rpc.atleta.network";
type HttptProvider = "https://testnet-rpc.atleta.network";

export class Substrate {
  private provider: HttpProvider | WsProvider;
  private api!: ApiPromise;
  address_table: string;
  blocks_table: string;

  constructor(provider: Provider) {
    this.address_table = "address_table.json";
    this.blocks_table = "blocks_table.json";

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

  public async init(): Promise<void> {
    try {
      this.api = await ApiPromise.create({ provider: this.provider });
    } catch (error) {
      throw error;
    }
  }

  public async getAccountInfo(
    blockNumber: number,
    address: string
  ): Promise<AccountInfo> {
    try {
      let address_table: AddressTable = JSON.parse(
        fs.readFileSync(this.address_table, "utf-8")
      );
      if (!address_table[address]) throw new Error("The address not found");

      const blockHash: BlockHash = await this.api.rpc.chain.getBlockHash(
        blockNumber
      );
      const apiAt = await this.api.at(blockHash);
      const codec: Codec = await apiAt.query.system.account(address);
      const json = codec.toJSON();

      let blocks_table: BlocksTable = JSON.parse(
        fs.readFileSync(this.blocks_table, "utf-8")
      );

      blocks_table[blockNumber] = {
        blockHash,
        date: Date.now(),
      };

      fs.writeFileSync(this.blocks_table, JSON.stringify(blocks_table));

      return json as unknown as AccountInfo;
    } catch (error) {
      throw error;
    }
  }

  public async addAddress(address: string) {
    try {
      let address_table: AddressTable = JSON.parse(
        fs.readFileSync(this.address_table, "utf-8")
      );
      if (address_table[address]) throw new Error("Address is already exist");
      address_table[address] = { date: Date.now() };
      fs.writeFileSync(this.address_table, JSON.stringify(address_table));
    } catch (error) {
      throw error;
    }
  }
}





























/* const init = async () => {
  try {
    const listener = new Substrate({
      rpc: "wss://testnet-rpc.atleta.network",
      type: "websocket",
    });
    await listener.init();
    const result = await listener.getAccountInfo(
      2819565,
      "0xB405F1F5051d9b1f658b308Ff55E144d9E5EF16C"
    );

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

init(); */
