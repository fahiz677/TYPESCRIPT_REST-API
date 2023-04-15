import express from 'express';
import { merge, get } from 'lodash';

import { getUserBySessionToken } from '../db/users';
import e from 'express';

export const isOwner = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;

        const sessionToken = req.cookies['FAHIZ-AUTH'];
        
        const currentUserId  = await getUserBySessionToken(sessionToken);


        if(!currentUserId)  res.sendStatus(400);

        if(currentUserId?._id.toString() !== id) return res.sendStatus(403);
        
        return next();
    } catch (error) {
        console.log(error);
        
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['FAHIZ-AUTH'];

        if(!sessionToken) res.sendStatus(403);

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) res.sendStatus(403);

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);

        return res.sendStatus(400)
    }
}
