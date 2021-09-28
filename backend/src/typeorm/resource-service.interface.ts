import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
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
  findOne: (id: number | string, cache?: boolean) => Promise<T>;
}

export interface ITenantedService<T> extends IService<T> {
  ownsResource(
    id: string | number,
    resourceId: string | number,
    foreignKey?: string,
  ): Promise<boolean>;
}
