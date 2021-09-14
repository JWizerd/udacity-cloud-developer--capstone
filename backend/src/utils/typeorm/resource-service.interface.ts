import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export interface IService {
  findOne: (id: number) => Promise<any>;
  find?: (paginationOptions: IPaginationOptions) => Promise<any[]>;
  create: (entity: any) => Promise<any>;
  update: (id: number, entity: any) => Promise<any>;
  remove: (id: number) => Promise<void>;
}
