// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AccountOwnerRewardInDayProps = Omit<AccountOwnerRewardInDay, NonNullable<FunctionPropertyNames<AccountOwnerRewardInDay>>>;

export class AccountOwnerRewardInDay implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public day?: Date;

    public pid?: bigint;

    public accountid?: string;

    public balance?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AccountOwnerRewardInDay entity without an ID");
        await store.set('AccountOwnerRewardInDay', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AccountOwnerRewardInDay entity without an ID");
        await store.remove('AccountOwnerRewardInDay', id.toString());
    }

    static async get(id:string): Promise<AccountOwnerRewardInDay | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AccountOwnerRewardInDay entity without an ID");
        const record = await store.get('AccountOwnerRewardInDay', id.toString());
        if (record){
            return AccountOwnerRewardInDay.create(record as AccountOwnerRewardInDayProps);
        }else{
            return;
        }
    }


    static async getByDay(day: Date): Promise<AccountOwnerRewardInDay[] | undefined>{
      
      const records = await store.getByField('AccountOwnerRewardInDay', 'day', day);
      return records.map(record => AccountOwnerRewardInDay.create(record as AccountOwnerRewardInDayProps));
      
    }

    static async getByPid(pid: bigint): Promise<AccountOwnerRewardInDay[] | undefined>{
      
      const records = await store.getByField('AccountOwnerRewardInDay', 'pid', pid);
      return records.map(record => AccountOwnerRewardInDay.create(record as AccountOwnerRewardInDayProps));
      
    }

    static async getByAccountid(accountid: string): Promise<AccountOwnerRewardInDay[] | undefined>{
      
      const records = await store.getByField('AccountOwnerRewardInDay', 'accountid', accountid);
      return records.map(record => AccountOwnerRewardInDay.create(record as AccountOwnerRewardInDayProps));
      
    }


    static create(record: AccountOwnerRewardInDayProps): AccountOwnerRewardInDay {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AccountOwnerRewardInDay(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
