// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PoolStakersSharesProps = Omit<PoolStakersShares, NonNullable<FunctionPropertyNames<PoolStakersShares>>>;

export class PoolStakersShares implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public pid?: bigint;

    public accountid?: string;

    public shares?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PoolStakersShares entity without an ID");
        await store.set('PoolStakersShares', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PoolStakersShares entity without an ID");
        await store.remove('PoolStakersShares', id.toString());
    }

    static async get(id:string): Promise<PoolStakersShares | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PoolStakersShares entity without an ID");
        const record = await store.get('PoolStakersShares', id.toString());
        if (record){
            return PoolStakersShares.create(record as PoolStakersSharesProps);
        }else{
            return;
        }
    }


    static async getByPid(pid: bigint): Promise<PoolStakersShares[] | undefined>{
      
      const records = await store.getByField('PoolStakersShares', 'pid', pid);
      return records.map(record => PoolStakersShares.create(record as PoolStakersSharesProps));
      
    }

    static async getByAccountid(accountid: string): Promise<PoolStakersShares[] | undefined>{
      
      const records = await store.getByField('PoolStakersShares', 'accountid', accountid);
      return records.map(record => PoolStakersShares.create(record as PoolStakersSharesProps));
      
    }


    static create(record: PoolStakersSharesProps): PoolStakersShares {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PoolStakersShares(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
