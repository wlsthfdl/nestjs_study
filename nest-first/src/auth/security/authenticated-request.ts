import { Request } from 'express';
import { Payload } from './payload.interface';

export interface AuthenticatedRequest extends Request {
  user: Payload;
}
