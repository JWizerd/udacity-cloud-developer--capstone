import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial } from 'typeorm';
import { ISearchOptions } from './search-options.interface';

export interface IService<T> {
  paginate(
    options: IPaginationOptions,
    searchOptions: ISearchOptions,
    order: string,
    userId?: string | number,
  ):
    | Promise<Pagination<T, IPaginationMeta>>
    | Promise<Pagination<T[], IPaginationMeta>>;

  update(id: number, entity: any): Promise<T>;
  remove(userId: string | number, id: number): Promise<void>;
}

export interface ITenantedService<T> extends IService<T> {
  findOne: (userId: string | number, id: number) => Promise<T>;
  create(entity: DeepPartial<T>, userId: string | number): Promise<T>;

  ownsResource(
    id: string | number,
    resourceId: string | number,
    foreignKey?: string,
  ): Promise<boolean>;
}

export interface IBaseService<T> extends IService<T> {
  findOne: (id: number | string) => Promise<T>;
  create(entity: DeepPartial<T>): Promise<T>;
}
