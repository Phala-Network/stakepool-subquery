// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AccountStakerInterestInBlockProps = Omit<AccountStakerInterestInBlock, NonNullable<FunctionPropertyNames<AccountStakerInterestInBlock>>>;

export class AccountStakerInterestInBlock implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockid?: bigint;

    public pid?: bigint;

    public accountid?: string;

    public balance?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AccountStakerInterestInBlock entity without an ID");
        await store.set('AccountStakerInterestInBlock', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AccountStakerInterestInBlock entity without an ID");
        await store.remove('AccountStakerInterestInBlock', id.toString());
    }

    static async get(id:string): Promise<AccountStakerInterestInBlock | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AccountStakerInterestInBlock entity without an ID");
        const record = await store.get('AccountStakerInterestInBlock', id.toString());
        if (record){
            return AccountStakerInterestInBlock.create(record as AccountStakerInterestInBlockProps);
        }else{
            return;
        }
    }


    static async getByBlockid(blockid: bigint): Promise<AccountStakerInterestInBlock[] | undefined>{
      
      const records = await store.getByField('AccountStakerInterestInBlock', 'blockid', blockid);
      return records.map(record => AccountStakerInterestInBlock.create(record as AccountStakerInterestInBlockProps));
      
    }

    static async getByPid(pid: bigint): Promise<AccountStakerInterestInBlock[] | undefined>{
      
      const records = await store.getByField('AccountStakerInterestInBlock', 'pid', pid);
      return records.map(record => AccountStakerInterestInBlock.create(record as AccountStakerInterestInBlockProps));
      
    }

    static async getByAccountid(accountid: string): Promise<AccountStakerInterestInBlock[] | undefined>{
      
      const records = await store.getByField('AccountStakerInterestInBlock', 'accountid', accountid);
      return records.map(record => AccountStakerInterestInBlock.create(record as AccountStakerInterestInBlockProps));
      
    }


    static create(record: AccountStakerInterestInBlockProps): AccountStakerInterestInBlock {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AccountStakerInterestInBlock(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
