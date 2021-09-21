import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { IService } from '../typeorm/resource-service.interface';

import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ISearchOptions } from './search-options.interface';

export class BaseService<T> implements IService<T> {
  constructor(
    protected readonly repo: Repository<T>,
    protected readonly paginator = paginate,
  ) {}

  async paginate(
    options: IPaginationOptions,
    searchOptions: ISearchOptions,
    order: string,
  ) {
    this.setOrderBy(order || 'DESC');
    if (options.limit > 50) options.limit = 50;
    return this.paginator<T>(this.repo, options, {
      where: { ...this.removeUndefinedProps(searchOptions) },
    });
  }

  protected setOrderBy(order: string | undefined): void {
    const orderStr = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const queryBuilder = this.repo.createQueryBuilder('e');
    queryBuilder.addOrderBy('e.created', orderStr, 'NULLS LAST');
  }

  protected removeUndefinedProps(obj: ObjectLiteral) {
    return JSON.parse(JSON.stringify(obj));
  }

  async remove(id: number | string): Promise<void> {
    const entity = await this.repo.findOne(id);
    this.repo.remove(entity);
  }

  async update(id: number | string, payload: DeepPartial<T>): Promise<T> {
    const existingRecord = await this.repo.findOne(id);
    const entity = { ...existingRecord, ...payload };
    return this.repo.save(entity);
  }
}
