import { Request } from "../../types/express";
import { ConnectionManager } from "../../database/connection-manager";
import { NextFunction } from "express";

const connectionName = process.env.DATABASE_NAME

export const connectionHandler = async (req: Request, next: NextFunction) => {
    const connectionManager: ConnectionManager = ConnectionManager.getInstance();
    const connection = await connectionManager.getConnection(connectionName);
    req.DbConnection = connection;
    next();
};
