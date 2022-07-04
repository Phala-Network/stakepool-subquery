// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AccountStakerInterestInDayProps = Omit<AccountStakerInterestInDay, NonNullable<FunctionPropertyNames<AccountStakerInterestInDay>>>;

export class AccountStakerInterestInDay implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public day?: string;

    public pid?: bigint;

    public accountid?: string;

    public balance?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AccountStakerInterestInDay entity without an ID");
        await store.set('AccountStakerInterestInDay', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AccountStakerInterestInDay entity without an ID");
        await store.remove('AccountStakerInterestInDay', id.toString());
    }

    static async get(id:string): Promise<AccountStakerInterestInDay | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AccountStakerInterestInDay entity without an ID");
        const record = await store.get('AccountStakerInterestInDay', id.toString());
        if (record){
            return AccountStakerInterestInDay.create(record as AccountStakerInterestInDayProps);
        }else{
            return;
        }
    }


    static async getByDay(day: string): Promise<AccountStakerInterestInDay[] | undefined>{
      
      const records = await store.getByField('AccountStakerInterestInDay', 'day', day);
      return records.map(record => AccountStakerInterestInDay.create(record as AccountStakerInterestInDayProps));
      
    }

    static async getByPid(pid: bigint): Promise<AccountStakerInterestInDay[] | undefined>{
      
      const records = await store.getByField('AccountStakerInterestInDay', 'pid', pid);
      return records.map(record => AccountStakerInterestInDay.create(record as AccountStakerInterestInDayProps));
      
    }

    static async getByAccountid(accountid: string): Promise<AccountStakerInterestInDay[] | undefined>{
      
      const records = await store.getByField('AccountStakerInterestInDay', 'accountid', accountid);
      return records.map(record => AccountStakerInterestInDay.create(record as AccountStakerInterestInDayProps));
      
    }


    static create(record: AccountStakerInterestInDayProps): AccountStakerInterestInDay {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AccountStakerInterestInDay(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
