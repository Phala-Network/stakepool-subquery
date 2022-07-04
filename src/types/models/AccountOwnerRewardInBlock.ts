// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AccountOwnerRewardInBlockProps = Omit<AccountOwnerRewardInBlock, NonNullable<FunctionPropertyNames<AccountOwnerRewardInBlock>>>;

export class AccountOwnerRewardInBlock implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockid?: bigint;

    public pid?: bigint;

    public accountid?: string;

    public balance?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AccountOwnerRewardInBlock entity without an ID");
        await store.set('AccountOwnerRewardInBlock', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AccountOwnerRewardInBlock entity without an ID");
        await store.remove('AccountOwnerRewardInBlock', id.toString());
    }

    static async get(id:string): Promise<AccountOwnerRewardInBlock | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AccountOwnerRewardInBlock entity without an ID");
        const record = await store.get('AccountOwnerRewardInBlock', id.toString());
        if (record){
            return AccountOwnerRewardInBlock.create(record as AccountOwnerRewardInBlockProps);
        }else{
            return;
        }
    }


    static async getByBlockid(blockid: bigint): Promise<AccountOwnerRewardInBlock[] | undefined>{
      
      const records = await store.getByField('AccountOwnerRewardInBlock', 'blockid', blockid);
      return records.map(record => AccountOwnerRewardInBlock.create(record as AccountOwnerRewardInBlockProps));
      
    }

    static async getByPid(pid: bigint): Promise<AccountOwnerRewardInBlock[] | undefined>{
      
      const records = await store.getByField('AccountOwnerRewardInBlock', 'pid', pid);
      return records.map(record => AccountOwnerRewardInBlock.create(record as AccountOwnerRewardInBlockProps));
      
    }

    static async getByAccountid(accountid: string): Promise<AccountOwnerRewardInBlock[] | undefined>{
      
      const records = await store.getByField('AccountOwnerRewardInBlock', 'accountid', accountid);
      return records.map(record => AccountOwnerRewardInBlock.create(record as AccountOwnerRewardInBlockProps));
      
    }


    static create(record: AccountOwnerRewardInBlockProps): AccountOwnerRewardInBlock {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AccountOwnerRewardInBlock(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
