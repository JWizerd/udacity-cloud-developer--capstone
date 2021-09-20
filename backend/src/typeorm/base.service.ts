import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { IService } from '../typeorm/resource-service.interface';

import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ISearchOptions } from './search-options.interface';

export class BaseService<T> implements IService<T> {
  constructor(
    protected readonly repo: Repository<T>,
    private readonly paginator = paginate,
  ) {}

  async paginate(
    options: IPaginationOptions,
    searchOptions: ISearchOptions,
    order: string,
  ) {
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

  async create(payload: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(payload);
    return this.repo.save(entity);
  }

  async update(id: number | string, payload: any): Promise<T> {
    const existingRecord = await this.repo.findOne(id);
    const entity = { ...existingRecord, ...payload };
    return this.repo.save(entity);
  }

  async findOne(id: number | string): Promise<T> {
    return this.repo.findOne(id);
  }

  async remove(id: number | string): Promise<void> {
    const entity = await this.repo.findOne(id);
    this.repo.remove(entity);
  }

  protected removeUndefinedProps(obj: ObjectLiteral) {
    return JSON.parse(JSON.stringify(obj));
  }
}
