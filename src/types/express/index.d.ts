import { Request as RequestType, Response as ResponseType } from 'express';
import { Connection } from 'typeorm';
import { Url } from '../../entity/url.entity';
export interface Request extends RequestType {
  currentUrl?: Url;
  DbConnection?: Connection
}

export interface Response extends ResponseType {}
