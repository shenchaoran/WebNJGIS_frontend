import { ResourceSrc } from './resource.enum';
import { User } from './user.class';
import * as ObjectID from 'objectid';

export class Topic {
    _id?: any;
    meta: {
        name: string,
        descHTML: string,
        descMD: string
        time: number
    };
    auth: {
        src: ResourceSrc,
        userId: string,
        userName: string
    };
    spatial: {
        dimension: 'point' | 'polygon' | 'multi-point',
        geojson: any
    };
    temporal: {
        start: number;
        end: number;
        scale: 'YEAR' | 'DAY';
    };
    solutionIds: string[];
    cid: string;
    subscribed_uids: string[];

    constructor(user: User, cid?: string) {
        this._id = ObjectID().toString();
        this.meta = {
            name: '',
            descMD: '',
            descHTML: '',
            time: new Date().getTime()
        };
        this.auth = {
            src: ResourceSrc.PUBLIC,
            userId: user._id,
            userName: user.username
        };
        this.subscribed_uids = [];
        this.solutionIds = [];
        this.cid = cid;
    }
}