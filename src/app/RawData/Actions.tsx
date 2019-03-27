import {
    fetchAction,
    jsonHeaders,
    responseReloadAction,
    whenComplete
} from 'redux-api-rest'

import * as moment from 'moment';
import { MetaData } from 'redux-api-rest';
import { Action, ResponseTypesActions } from 'redux-api-rest/lib/Types';

export const FETCH_RAW_DATA = "RAW_DATA_FETCH";

const DATE_FORMAT_REQUEST = "YYYY-MM-DD"

const fetchMore=(from:moment.Moment, cb: (to:moment.Moment)=>Action):ResponseTypesActions=>
    (meta:MetaData, data)=>{
        if (!meta.isLoading && data &&(data as any[]).length>0){
            return cb(from)
        }
    }

export const RawDataResponseActions = {
    reloadMultiple: responseReloadAction(FETCH_RAW_DATA) ,
    single: (meta: MetaData, data: any, error)=>{
        let data2 = data;
        if (data){
            data2 = [data]
        }
        return RawDataResponseActions.reloadMultiple(meta, data2, error)
    },
}

export const RawDataActions = {
    fetch: (to=moment())=>{
        const from= to.clone().subtract(6, "months")
        return fetchAction('/api/raw-data/?from='+from.format(DATE_FORMAT_REQUEST)+'&to='+to.format(DATE_FORMAT_REQUEST), [
            FETCH_RAW_DATA,
            fetchMore(from, RawDataActions.fetch)
        ]);
    },
    setDescription: (rdsId: number, description:string)=>{
        return fetchAction('/api/raw-data/'+rdsId+'/description/', [], {
            body: JSON.stringify({description}),
            headers: jsonHeaders(),
            method: "POST"
        })
    },
    update: (to=moment())=>{
        const from= to.clone().subtract(6, "months")
        return fetchAction('/api/raw-data/?from='+from.format(DATE_FORMAT_REQUEST)+'&to='+to.format(DATE_FORMAT_REQUEST), [
            RawDataResponseActions.reloadMultiple,
            fetchMore(from, RawDataActions.update)
        ]);
    },
}

export const TagActions = {
    add: (rds, tag)=>{
        return fetchAction('/api/raw-data/'+rds+'/link/', [ whenComplete(()=>RawDataActions.update()) ] as any, {
            body: JSON.stringify({tag}),
            headers: jsonHeaders(),
            method: "POST"
        })
    },
    
    remove:(rds, tag)=>{
        return fetchAction('/api/raw-data/'+rds+'/link/', whenComplete(()=>RawDataActions.update()), {
            body: JSON.stringify({tag}),
            headers: jsonHeaders(),
            method: "DELETE",
        })
    }
}