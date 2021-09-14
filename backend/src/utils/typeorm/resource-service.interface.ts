import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ISearchOptions } from './search-options.interface';

export interface IService<T> {
  findOne: (userId: string | number, id: number) => Promise<T>;

  paginate(
    options: IPaginationOptions,
    searchOptions: ISearchOptions,
    order: string,
    userId?: string | number,
  ):
    | Promise<Pagination<T, IPaginationMeta>>
    | Promise<Pagination<T[], IPaginationMeta>>;
  paginate(
    options: IPaginationOptions,
    searchOptions: ISearchOptions,
    order: string,
    userId?: string | number,
  ):
    | Promise<Pagination<T, IPaginationMeta>>
    | Promise<Pagination<T[], IPaginationMeta>>;

  create(userId: string | number, entity: any): Promise<T>;
  create(entity: any): Promise<T>;

  update(userId: string | number, id: number, entity: any): Promise<T>;
  update(id: number, entity: any): Promise<T>;

  remove(userId: string | number, id: number): Promise<void>;
}
