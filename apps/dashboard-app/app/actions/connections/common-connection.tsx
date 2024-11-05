'use server'

import { CONNECTIONS } from '../../../lib/constant';
import { getUserInfo } from './user-connections';

export const getConnectionsAction = async(userId:string) => {
    const userInfo = await getUserInfo(userId);
    if (!userInfo) {
        return [];
    }

    const newConnections = await Promise.all(
        userInfo.connections.map(async (connection: any) => {
            const cons = CONNECTIONS.find((con:any) => con.title === connection.type);
            if (cons) {
                const newConnection = { ...cons, ...connection };
                return newConnection;
            }
        })
    );

    // Filter out undefined values (if any)
    const filteredConnections = newConnections.filter(Boolean);

    // Remove duplicates based on 'id'
    const uniqueConnections = filteredConnections.filter(
        (conn, index, self) => index === self.findIndex((c) => c.id === conn.id)
    );

    return uniqueConnections;
};