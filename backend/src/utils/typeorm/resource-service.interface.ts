import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { DeleteResult } from 'typeorm';

export interface IService {
  findOne: (id: number) => Promise<any>;
  find?: (paginationOptions: IPaginationOptions) => Promise<any[]>;
  create: (entity: any, parentId: number, joinColumn: string) => Promise<any>;
  update: (entity: any, id: number) => Promise<any>;
  remove: (id: number) => Promise<DeleteResult>;
}
