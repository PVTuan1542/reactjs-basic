import * as e from 'express';
import { Query } from 'express-serve-static-core';

import { ISessionUser } from '@src/models/User';
import { IPost } from '@src/models/Posts';


// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser: ISessionUser;
  };
}

export interface IPosts extends e.Response{
  locals: {
    post: IPost
  };
}

