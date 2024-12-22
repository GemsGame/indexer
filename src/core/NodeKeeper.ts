import { ApiPromise } from "@polkadot/api";
import { AccountInfo, BlockHash } from "@polkadot/types/interfaces";
import { Codec } from "@polkadot/types/types";
import fs from "fs";

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

export class NodeKeeper {
  address_table: string;
  blocks_table: string;

  constructor() {
    this.address_table = "address_table.json";
    this.blocks_table = "blocks_table.json";
  }

  public async getBlockHash(
    blockNumber: number,
    api: ApiPromise
  ): Promise<BlockHash> {
    try {
      const blockHash: BlockHash = await api.rpc.chain.getBlockHash(
        blockNumber
      );

      return blockHash;
    } catch (error) {
      throw error;
    }
  }

  public async getAccountState(
    blockHash: BlockHash,
    address: string,
    api: ApiPromise
  ): Promise<AccountInfo> {
    const address_table: AddressTable = JSON.parse(
      fs.readFileSync(this.address_table, "utf-8")
    );

    try {
      if (!address_table[address]) throw new Error("The address not found");
      const apiAt = await api.at(blockHash);
      const codec: Codec = await apiAt.query.system.account(address);
      const json = codec.toJSON();

      return json as unknown as AccountInfo;
    } catch (error) {
      throw error;
    }
  }

  public async addNewBlock(
    blockHash: BlockHash,
    blockNumber: number
  ): Promise<BlocksTable> {
    let blocks_table: BlocksTable = JSON.parse(
      fs.readFileSync(this.blocks_table, "utf-8")
    );

    blocks_table[blockNumber] = {
      blockHash,
      date: Date.now(),
    };

    fs.writeFileSync(this.blocks_table, JSON.stringify(blocks_table));

    return blocks_table;
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
