// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ErrorRecordProps = Omit<ErrorRecord, NonNullable<FunctionPropertyNames<ErrorRecord>>>;

export class ErrorRecord implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public errortype?: string;

    public error?: string;

    public blockid?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ErrorRecord entity without an ID");
        await store.set('ErrorRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ErrorRecord entity without an ID");
        await store.remove('ErrorRecord', id.toString());
    }

    static async get(id:string): Promise<ErrorRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ErrorRecord entity without an ID");
        const record = await store.get('ErrorRecord', id.toString());
        if (record){
            return ErrorRecord.create(record as ErrorRecordProps);
        }else{
            return;
        }
    }


    static async getByErrortype(errortype: string): Promise<ErrorRecord[] | undefined>{
      
      const records = await store.getByField('ErrorRecord', 'errortype', errortype);
      return records.map(record => ErrorRecord.create(record as ErrorRecordProps));
      
    }

    static async getByError(error: string): Promise<ErrorRecord[] | undefined>{
      
      const records = await store.getByField('ErrorRecord', 'error', error);
      return records.map(record => ErrorRecord.create(record as ErrorRecordProps));
      
    }

    static async getByBlockid(blockid: string): Promise<ErrorRecord[] | undefined>{
      
      const records = await store.getByField('ErrorRecord', 'blockid', blockid);
      return records.map(record => ErrorRecord.create(record as ErrorRecordProps));
      
    }


    static create(record: ErrorRecordProps): ErrorRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ErrorRecord(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
