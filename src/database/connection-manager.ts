import { Connection, createConnections, createConnection } from 'typeorm';
import { remove } from 'lodash';

export class ConnectionManager {
  private static instance: ConnectionManager;

  private connections: Connection[];

  public static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }

    return ConnectionManager.instance;
  }

  public async getConnection(connectionName = 'default'): Promise<Connection> {
    if (!this.connections) {
      this.connections = await createConnections();
    }
    let connection = this.connections.find((c) => c.name === connectionName);
    if (!connection || !connection.isConnected) {
      connection = await createConnection(connectionName);
      this.connections.push(connection);
    }
    if (!connection) {
      throw Error(`Connection with name ${connectionName} is not established`);
    }

    return connection;
  }

  public async closeConnection(connectionName = 'default'): Promise<void> {
    const connection = this.connections && this.connections.find((c) => c.name === connectionName);
    if (connection && connection.isConnected) {
      await connection.close();
      remove(this.connections, (e) => e.name === connectionName);
    }
  }
}
