import { DeleteResult, ObjectLiteral, Repository } from 'typeorm';
import { IService } from '../typeorm/resource-service.interface';

import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { ISearchOptions } from './search-options.interface';

export class BaseService<T> implements IService {
  constructor(
    protected readonly repo: Repository<T>,
    private readonly paginator = paginate,
  ) {}

  async paginate(
    options: IPaginationOptions,
    searchOptions: ISearchOptions,
    order: string,
  ): Promise<Pagination<T>> {
    this.setOrderBy(order || 'DESC');
    return this.paginator<T>(this.repo, options, {
      where: { ...this.removeUndefinedProps(searchOptions) },
    });
  }

  protected setOrderBy(order: string | undefined): void {
    const orderStr = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const queryBuilder = this.repo.createQueryBuilder('e');
    queryBuilder.addOrderBy('e.created', orderStr, 'NULLS LAST');
  }

  async create(payload: T): Promise<T> {
    return this.repo.save(payload);
  }

  async update(fields: T, id: number): Promise<T> {
    const existingRecord = await this.repo.findOne(id);
    const entity = { ...existingRecord, ...fields };
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<T> {
    return this.repo.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }

  protected removeUndefinedProps(obj: ObjectLiteral) {
    return JSON.parse(JSON.stringify(obj));
  }
}
