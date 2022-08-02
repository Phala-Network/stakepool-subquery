import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {PoolStakersShares,AccountOwnerRewardInBlock,AccountStakerInterestInBlock,AccountOwnerRewardInDay,AccountStakerInterestInDay, PoolShares, ErrorRecord, WorkerStatus} from "../types";
import {Balance} from "@polkadot/types/interfaces";
import {blake2AsHex} from '@polkadot/util-crypto';

import dumpfile from "./dumpfile.json";
import pool from "./pool.json";

enum ErrorType {
    PoolNotFound = "PoolNotFound",
    StakerNotFound = "StakerNotFound",
    PoolSharesLessThanZero = "PoolShareLessThanZero",
    StakerSharesLessThanZero = "StakerSharesLessThanZero",
    WorkerNotFound = "WorkerNotFound",
    DublicateWorkers = "DublicateWorkers",
}

enum MinerState {
    Ready = "Ready",
    MiningIdle = "MiningIdle",
    MiningActive = "MiningActive",
    MiningUnresponsive = "MiningUnresponsive",
    MiningCoolingDown = "MiningCoolingDown",
}

// need update event
export async function handleAddWorkerEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [pid, publickey, miner]}} = event;
    let hashkey = blake2AsHex(String(pid) + ' ' + publickey);
    let record = new WorkerStatus(hashkey);
    record.pid = BigInt(pid.toString());
    record.publickey = publickey.toString();
    record.miner = miner.toString();
    record.save();
}

export async function handleRemoveWorkerEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [pid, publickey]}} = event;
    let hashkey = blake2AsHex(String(pid) + ' ' + publickey);
    let record = new WorkerStatus(hashkey);
    record.save();
}
// need new event
export async function handleStartMiningEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [pid, publickey, amount]}} = event;
    let hashkey = blake2AsHex(String(pid) + ' ' + publickey);
    let record = await WorkerStatus.get(hashkey);
    if (record == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(pid) + ' ' + String(publickey));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["pid"] = String(pid);
        error_map["publickey"] = String(publickey);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let float_amount = parseFloat(amount.toString());
    record.Stake = float_amount;
    record.save();
}

export async function handleReclaimWorkerEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [pid, publickey]}} = event;
    let hashkey = blake2AsHex(String(pid) + ' ' + publickey);
    let record = await WorkerStatus.get(hashkey);
    if (record == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(pid) + ' ' + String(publickey));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["pid"] = String(pid);
        error_map["publickey"] = String(publickey);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    record.Stake = 0;
    record.Mined = 0;
    record.pinitial = "0";
    record.pinstant = "0";
    record.v = "0";
    record.ve = "0";
    record.save();
}

export async function handleWorkerStartEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [publickey, ve, pinitial]}} = event;
    let records = await WorkerStatus.getByPublickey(publickey.toString());
    if (records == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(publickey));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["publickey"] = String(publickey);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    if (records.length != 1) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.DublicateWorkers + ' ' + String(publickey));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.DublicateWorkers;
        let error_map = new Map();
        error_map["publickey"] = String(publickey);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let record = records[0];
    record.ve = ve.toString();
    record.pinitial = pinitial.toString();
    record.State = MinerState.MiningIdle;
    record.save();
}

export async function handleWorkerStopEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [miner]}} = event;
    let records = await WorkerStatus.getByMiner(miner.toString());
    if (records == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    if (records.length != 1) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.DublicateWorkers + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.DublicateWorkers;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let record = records[0];
    record.State = MinerState.MiningCoolingDown;
    record.save();
}

export async function handleMinerBoundEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [miner]}} = event;
    let records = await WorkerStatus.getByMiner(miner.toString());
    if (records == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    if (records.length != 1) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.DublicateWorkers + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.DublicateWorkers;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let record = records[0];
    record.State = MinerState.Ready;
    record.save();
}

export async function handleMinerEnterUnresponsiveEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [miner]}} = event;
    let records = await WorkerStatus.getByMiner(miner.toString());
    if (records == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    if (records.length != 1) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.DublicateWorkers + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.DublicateWorkers;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let record = records[0];
    record.State = MinerState.MiningUnresponsive;
    record.save();
}

export async function handlMinerExitUnresponsiveEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [miner]}} = event;
    let records = await WorkerStatus.getByMiner(miner.toString());
    if (records == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    if (records.length != 1) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.DublicateWorkers + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.DublicateWorkers;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let record = records[0]; 
    record.State = MinerState.MiningIdle;
    record.save();
}

export async function handleOnRewardEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [miner, v, amount]}} = event;
    let records = await WorkerStatus.getByMiner(miner.toString());
    if (records == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    if (records.length != 1) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.DublicateWorkers + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.DublicateWorkers;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let record = records[0];
    let float_amount = parseFloat(amount.toString());
    record.v = v.toString();
    record.Mined += float_amount;
    record.save();
}

// need new event
export async function handleBenchMarkUpdateEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [miner, pinstant]}} = event;
    let records = await WorkerStatus.getByMiner(miner.toString());
    if (records == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.WorkerNotFound + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.WorkerNotFound;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    if (records.length != 1) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.DublicateWorkers + ' ' + String(miner));
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.DublicateWorkers;
        let error_map = new Map();
        error_map["miner"] = String(miner);
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
    let record = records[0];
    record.pinstant = pinstant.toString();
    record.save();
}

export async function handleContributionShareEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [pid, accountid, amount, share]}} = event;
    let hashkey  = blake2AsHex(String(pid) + ' ' + accountid);
    let record = await PoolStakersShares.get(hashkey);
    let str_pid = pid.toString();
    let str_accountid = accountid.toString();
    let bigint_share = BigInt(share.toString());
    if (record == undefined) {
        record = new PoolStakersShares(hashkey);
        record.pid = BigInt(str_pid);
        record.shares = bigint_share;
        record.accountid = str_accountid;
    } else {
        record.shares += bigint_share;
    }
    await record.save();
    let poolrecord = await PoolShares.get(str_pid);
    if (poolrecord == undefined) {
        poolrecord = new PoolShares(str_pid);
        poolrecord.shares = bigint_share;     
        poolrecord.poolstakers = Array(str_accountid);
        return
    }
    poolrecord.shares += bigint_share;
    if (poolrecord.poolstakers == undefined) {
        poolrecord.poolstakers = Array(str_accountid);
    }
    if (!poolrecord.poolstakers.includes(str_accountid)) {
        poolrecord.poolstakers.push(str_accountid);
    }
    await poolrecord.save();
}

export async function handleWithdrawalShareEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [pid, accountid, amount, share]}} = event;
    let hashkey  = blake2AsHex(String(pid) + ' ' + accountid);
    let str_pid = pid.toString();
    let str_accountid = accountid.toString();
    let bigint_share = BigInt(share.toString());   
    let record = await PoolStakersShares.get(hashkey);
    if (record != undefined) {
        record.shares -= bigint_share;
        if (record.shares < 0) {
            let blockid = event.block.timestamp.toString();
            let errorkey = blake2AsHex(blockid + ' ' + ErrorType.StakerSharesLessThanZero + ' ' + str_pid + ' ' + str_accountid);
            let error_record = new ErrorRecord(errorkey);
            error_record.errortype = ErrorType.StakerSharesLessThanZero;
            let error_map = new Map();
            error_map["pid"] = str_pid;
            error_map["accountid"] = str_accountid;
            error_record.blockid = blockid;
            error_record.error = JSON.stringify(error_map);
            await error_record.save();
            return
        }
        await record.save();
        let poolrecord = await PoolShares.get(str_pid);
        if (poolrecord == undefined) {
            let blockid = event.block.timestamp.toString();
            let errorkey = blake2AsHex(blockid + ' ' + ErrorType.PoolNotFound + ' ' + str_pid);
            let error_record = new ErrorRecord(errorkey);
            error_record.errortype = ErrorType.PoolNotFound;
            let error_map = new Map();
            error_map["pid"] = str_pid;
            error_record.blockid = blockid;
            error_record.error = JSON.stringify(error_map);
            await error_record.save();
            return
        }
        poolrecord.shares -= bigint_share;
        if (poolrecord.shares < 0) {
            let blockid = event.block.timestamp.toString();
            let errorkey = blake2AsHex(blockid + ' ' + ErrorType.PoolSharesLessThanZero + ' ' + str_pid);
            let error_record = new ErrorRecord(errorkey);
            error_record.errortype = ErrorType.PoolSharesLessThanZero;
            let error_map = new Map();
            error_map["pid"] = str_pid;
            error_record.blockid = blockid;
            error_record.error = JSON.stringify(error_map);
            await error_record.save();
        }
        if (record.shares == BigInt(0)) {
            poolrecord.poolstakers.splice(poolrecord.poolstakers.indexOf(str_accountid), 1);
        }
        await poolrecord.save();
    } else {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.StakerNotFound + ' ' + str_pid + ' ' + str_accountid);
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.StakerNotFound;
        let error_map = new Map();
        error_map["pid"] = str_pid;
        error_map["accountid"] = str_accountid;
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
    }
}

export async function handleRewardReceivedEvent(event: SubstrateEvent): Promise<void> {
    logger.info("rawdata:" + event.toString());
    const {event: {data: [pid, ownerreward, stakerinterest]}} = event;
    let blockid = event.block.block.header.number;
    let str_pid = pid.toString();
    let poolrecord = await PoolShares.get(pid.toString());
    if (poolrecord == undefined) {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.PoolNotFound + ' ' + str_pid);
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.PoolNotFound;
        let error_map = new Map();
        error_map["pid"] = str_pid;
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    } 
    logger.info(poolrecord);
    let accountid = poolrecord.owner.toString();
    let int_ownerreward = (ownerreward as Balance).toNumber();
    let int_stakerinterest = (stakerinterest as Balance).toNumber();
    
    let str_accountid = accountid.toString();
    let block_key = blake2AsHex(String(blockid) + ' ' + String(pid) + ' ' + accountid);
    let block_owner_record = await AccountOwnerRewardInBlock.get(block_key);
    if (block_owner_record == undefined) {
        let block_owner_record1 = new AccountOwnerRewardInBlock(block_key);
        block_owner_record1.blockid = BigInt(blockid.toString());
        block_owner_record1.pid = BigInt(pid.toString());
        block_owner_record1.accountid = accountid.toString();
        block_owner_record1.balance = int_ownerreward;
        await block_owner_record1.save();
    } else {
        block_owner_record.balance += int_ownerreward;
        await block_owner_record.save();
    }
    
    let date = new Date();
    let date_key = blake2AsHex(date.toLocaleDateString + ' ' + String(pid) + ' ' + accountid);
    let date_owner_record = await AccountOwnerRewardInDay.get(date_key);
    if (date_owner_record == undefined) {
        let date_owner_record1 = new AccountOwnerRewardInDay(date_key);
        date_owner_record1.day = date.toLocaleDateString();
        date_owner_record1.pid = BigInt(pid.toString());
        date_owner_record1.accountid = accountid.toString();
        date_owner_record1.balance = int_ownerreward;
        await date_owner_record1.save();
    } else {
        date_owner_record.balance += int_ownerreward;
        await date_owner_record.save();
    }
    
    

    if (poolrecord.shares > 0) {
        for (var idx = 0; idx < poolrecord.poolstakers.length; idx++) {
            let accountid = poolrecord.poolstakers[idx];
            let user_key = blake2AsHex(String(pid) + ' ' + accountid);
            let record = await PoolStakersShares.get(user_key);
            if (record == undefined) {
                let blockid = event.block.timestamp.toString();
                let errorkey = blake2AsHex(blockid + ' ' + ErrorType.StakerNotFound + ' ' + str_pid + ' ' + str_accountid);
                let error_record = new ErrorRecord(errorkey);
                error_record.errortype = ErrorType.StakerNotFound;
                let error_map = new Map();
                error_map["pid"] = str_pid;
                error_map["accountid"] = str_accountid;
                error_record.blockid = blockid;
                error_record.error = JSON.stringify(error_map);
                await error_record.save();
                return
            }
            let block_key = blake2AsHex(String(blockid) + String(pid) + ' ' + accountid);
            let date_key = blake2AsHex(date.toLocaleDateString + String(pid) + ' ' + accountid);
            let staker_interest = int_stakerinterest * parseFloat(record.shares.toString()) / parseFloat(poolrecord.shares.toString());
            let block_staker_record = await AccountStakerInterestInBlock.get(block_key);
            if (block_staker_record == undefined) {
            let block_staker_record1 = new AccountStakerInterestInBlock(block_key);       
                block_staker_record1.blockid = BigInt(blockid.toString());
                block_staker_record1.pid = BigInt(pid.toString());
                block_staker_record1.accountid = accountid.toString();
                block_staker_record1.balance = staker_interest;
                await block_staker_record1.save();
            } else {
                block_staker_record.balance += staker_interest;
                await block_staker_record.save();
            }
            let day_staker_record = await AccountStakerInterestInDay.get(date_key);
            if (day_staker_record == undefined) {
                let day_staker_record1 = new AccountStakerInterestInDay(date_key);
                day_staker_record1.day = date.toLocaleDateString();
                day_staker_record1.pid = BigInt(pid.toString());
                day_staker_record1.accountid = accountid.toString();
                day_staker_record1.balance = staker_interest;
                await day_staker_record1.save();
            } else {
                day_staker_record.balance += staker_interest;
                await day_staker_record.save();
            }
        }
    } else {
        let blockid = event.block.timestamp.toString();
        let errorkey = blake2AsHex(blockid + ' ' + ErrorType.PoolSharesLessThanZero + ' ' + str_pid);
        let error_record = new ErrorRecord(errorkey);
        error_record.errortype = ErrorType.PoolSharesLessThanZero;
        let error_map = new Map();
        error_map["pid"] = str_pid;
        error_record.blockid = blockid;
        error_record.error = JSON.stringify(error_map);
        await error_record.save();
        return
    }
}

export async function handlePoolCreatedEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [accountid, pid]}} = event;
    let poolrecord = new PoolShares(pid.toString());
    poolrecord.poolstakers = Array();
    poolrecord.owner = accountid.toString();
    poolrecord.shares = BigInt(0);
    await poolrecord.save();
}

export async function handleDumpDataOnce(block: SubstrateBlock): Promise<void> {
    var once_timestamp = "1659434340389";
    logger.info(block.timestamp.getTime().toString());
    if (once_timestamp == block.timestamp.getTime().toString()) {
        logger.info("start push genisis data");
        for (var i in pool) {
            let poolrecord = new PoolShares(i);
            poolrecord.shares = BigInt(pool[i]["shares"]);
            poolrecord.owner = pool[i]["owner"];
            poolrecord.save();
        }
        for (let i = 0; i < dumpfile.length; i++) {
            let hashkey  = blake2AsHex(dumpfile[i]["pid"] + ' ' + dumpfile[i]["accountid"]);
            let record = new PoolStakersShares(hashkey);
            record.pid = BigInt(dumpfile[i]["pid"]);
            record.accountid = dumpfile[i]["accountid"];
            record.shares = BigInt(dumpfile[i]["shares"]);
            record.save();
            let poolrecord = await PoolShares.get(dumpfile[i]["pid"]);
            if (poolrecord != undefined) {
                if (poolrecord.poolstakers == undefined) {
                    poolrecord.poolstakers = Array(dumpfile[i]["accountid"]);
                } else {
                    if (!poolrecord.poolstakers.includes(dumpfile[i]["accountid"])) {
                        poolrecord.poolstakers.push(dumpfile[i]["accountid"]);
                    }
                }
                poolrecord.save();
            }
       }
  }

}