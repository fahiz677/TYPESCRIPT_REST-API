import express from 'express';
import {get , merge}  from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['FAHIZ-AUTH'];

        if(!sessionToken) res.sendStatus(403);

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) res.sendStatus(403);

        merge(req, {identity: existingUser});

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
