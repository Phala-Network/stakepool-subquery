// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type EventRecordProps = Omit<EventRecord, NonNullable<FunctionPropertyNames<EventRecord>>>;

export class EventRecord implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public second?: string;

    public minute?: string;

    public hour?: string;

    public day?: string;

    public event?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save EventRecord entity without an ID");
        await store.set('EventRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove EventRecord entity without an ID");
        await store.remove('EventRecord', id.toString());
    }

    static async get(id:string): Promise<EventRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get EventRecord entity without an ID");
        const record = await store.get('EventRecord', id.toString());
        if (record){
            return EventRecord.create(record as EventRecordProps);
        }else{
            return;
        }
    }


    static async getBySecond(second: string): Promise<EventRecord[] | undefined>{
      
      const records = await store.getByField('EventRecord', 'second', second);
      return records.map(record => EventRecord.create(record as EventRecordProps));
      
    }

    static async getByMinute(minute: string): Promise<EventRecord[] | undefined>{
      
      const records = await store.getByField('EventRecord', 'minute', minute);
      return records.map(record => EventRecord.create(record as EventRecordProps));
      
    }

    static async getByHour(hour: string): Promise<EventRecord[] | undefined>{
      
      const records = await store.getByField('EventRecord', 'hour', hour);
      return records.map(record => EventRecord.create(record as EventRecordProps));
      
    }

    static async getByDay(day: string): Promise<EventRecord[] | undefined>{
      
      const records = await store.getByField('EventRecord', 'day', day);
      return records.map(record => EventRecord.create(record as EventRecordProps));
      
    }

    static async getByEvent(event: string): Promise<EventRecord[] | undefined>{
      
      const records = await store.getByField('EventRecord', 'event', event);
      return records.map(record => EventRecord.create(record as EventRecordProps));
      
    }


    static create(record: EventRecordProps): EventRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new EventRecord(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
