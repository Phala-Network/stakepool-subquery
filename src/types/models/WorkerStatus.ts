// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type WorkerStatusProps = Omit<WorkerStatus, NonNullable<FunctionPropertyNames<WorkerStatus>>>;

export class WorkerStatus implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public pid?: bigint;

    public publickey?: string;

    public miner?: string;

    public Stake?: string;

    public Mined?: string;

    public pinitial?: string;

    public pinstant?: string;

    public v?: string;

    public ve?: string;

    public State?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save WorkerStatus entity without an ID");
        await store.set('WorkerStatus', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove WorkerStatus entity without an ID");
        await store.remove('WorkerStatus', id.toString());
    }

    static async get(id:string): Promise<WorkerStatus | undefined>{
        assert((id !== null && id !== undefined), "Cannot get WorkerStatus entity without an ID");
        const record = await store.get('WorkerStatus', id.toString());
        if (record){
            return WorkerStatus.create(record as WorkerStatusProps);
        }else{
            return;
        }
    }


    static async getByPid(pid: bigint): Promise<WorkerStatus[] | undefined>{
      
      const records = await store.getByField('WorkerStatus', 'pid', pid);
      return records.map(record => WorkerStatus.create(record as WorkerStatusProps));
      
    }

    static async getByPublickey(publickey: string): Promise<WorkerStatus[] | undefined>{
      
      const records = await store.getByField('WorkerStatus', 'publickey', publickey);
      return records.map(record => WorkerStatus.create(record as WorkerStatusProps));
      
    }

    static async getByMiner(miner: string): Promise<WorkerStatus[] | undefined>{
      
      const records = await store.getByField('WorkerStatus', 'miner', miner);
      return records.map(record => WorkerStatus.create(record as WorkerStatusProps));
      
    }

    static async getByState(State: string): Promise<WorkerStatus[] | undefined>{
      
      const records = await store.getByField('WorkerStatus', 'State', State);
      return records.map(record => WorkerStatus.create(record as WorkerStatusProps));
      
    }


    static create(record: WorkerStatusProps): WorkerStatus {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new WorkerStatus(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
