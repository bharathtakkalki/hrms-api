import { MongoClient } from 'mongodb';
import config from './config';
import { DatabaseConnectionError } from './utils/errors';


let _db = null;

const initiliseDB = (callback) =>{
    MongoClient.connect(config.db_url,(err,client)=>{
        if(err) {
            console.log("Connection to db failed"+config.db_name)
            console.log(err)
            throw new DatabaseConnectionError("Server Error");
        }
        _db = client.db(config.db_name);
        console.log("Connection to the db established " + config.db_name)
        callback();
    })
}

export const getDB = () => _db;


export default initiliseDB;
 