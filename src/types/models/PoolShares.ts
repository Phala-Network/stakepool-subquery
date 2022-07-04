// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PoolSharesProps = Omit<PoolShares, NonNullable<FunctionPropertyNames<PoolShares>>>;

export class PoolShares implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public shares?: bigint;

    public poolstakers?: string[];

    public owner?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PoolShares entity without an ID");
        await store.set('PoolShares', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PoolShares entity without an ID");
        await store.remove('PoolShares', id.toString());
    }

    static async get(id:string): Promise<PoolShares | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PoolShares entity without an ID");
        const record = await store.get('PoolShares', id.toString());
        if (record){
            return PoolShares.create(record as PoolSharesProps);
        }else{
            return;
        }
    }


    static async getByShares(shares: bigint): Promise<PoolShares[] | undefined>{
      
      const records = await store.getByField('PoolShares', 'shares', shares);
      return records.map(record => PoolShares.create(record as PoolSharesProps));
      
    }

    static async getByOwner(owner: string): Promise<PoolShares[] | undefined>{
      
      const records = await store.getByField('PoolShares', 'owner', owner);
      return records.map(record => PoolShares.create(record as PoolSharesProps));
      
    }


    static create(record: PoolSharesProps): PoolShares {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PoolShares(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
