// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CostStatisticProps = Omit<CostStatistic, NonNullable<FunctionPropertyNames<CostStatistic>>>;

export class CostStatistic implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public frequency?: bigint;

    public totalcost?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CostStatistic entity without an ID");
        await store.set('CostStatistic', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CostStatistic entity without an ID");
        await store.remove('CostStatistic', id.toString());
    }

    static async get(id:string): Promise<CostStatistic | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CostStatistic entity without an ID");
        const record = await store.get('CostStatistic', id.toString());
        if (record){
            return CostStatistic.create(record as CostStatisticProps);
        }else{
            return;
        }
    }


    static async getByTotalcost(totalcost: bigint): Promise<CostStatistic[] | undefined>{
      
      const records = await store.getByField('CostStatistic', 'totalcost', totalcost);
      return records.map(record => CostStatistic.create(record as CostStatisticProps));
      
    }


    static create(record: CostStatisticProps): CostStatistic {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CostStatistic(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
