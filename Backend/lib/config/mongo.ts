import * as mongoose from "mongoose";

export default class Mongo {
    private _mongoAddress: string = process.env.DB_HOST || "127.0.0.1";
    private _mongoPort: string = process.env.DB_PORT || "27017";
    private _connectionOptions: mongoose.ConnectionOptions = { useNewUrlParser: true };
    private _dbName: string = "";

    constructor() {
        if (process.env.DB_AUTH === "true") {
            this._connectionOptions["user"] = process.env.DB_USER;
            this._connectionOptions["pass"] = process.env.DB_PASS;
        }

        switch (process.env.NODE_ENV) {
            case "test":
                this._dbName = "sportify_test";
                break;
            case "production":
                this._dbName = "sportify_prod";
                break;
            default:
                this._dbName = "sportify_dev";
        }
    }

    public connect = async (): Promise<void> => {
        try {
            await mongoose.connect(`mongodb://${this._mongoAddress}:${this._mongoPort}/${this._dbName}`, this._connectionOptions);
            console.log("Successfully connected to MongoDb");
        } catch (error) {
            if (error.message.indexOf("ECONNREFUSED") !== -1) {
                console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
                process.exit(1);
            } else {
                throw error;
            }
        }
    };
}
