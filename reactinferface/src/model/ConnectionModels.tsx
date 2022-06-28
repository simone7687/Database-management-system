
export type ConnectionModel = {
    key: string,
}

export interface PostgreSQLConnectionModel extends ConnectionModel {
    host: string,
    user: string,
    dbName: string,
    password: string,
    port: string,
}

export interface PostgreSQLQueryModel extends PostgreSQLConnectionModel {
    query?: string,
}

export interface SQLiteConnectionModel extends ConnectionModel {
    path: string,
}

export interface SQLiteQueryModel extends SQLiteConnectionModel {
    query?: string,
}