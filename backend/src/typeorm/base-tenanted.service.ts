import { ObjectLiteral, Repository } from 'typeorm';

import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ISearchOptions } from './search-options.interface';

export class TenantedService<T> {
  constructor(
    protected readonly repo: Repository<T>,
    private readonly paginator = paginate,
  ) {}

  async paginate(
    options: IPaginationOptions,
    searchOptions: ISearchOptions,
    order: string,
    userId?: string,
  ) {
    if (userId) searchOptions.user = userId;
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

  protected removeUndefinedProps(obj: ObjectLiteral) {
    return JSON.parse(JSON.stringify(obj));
  }

  async ownsResource(
    id: string | number,
    resourceId: string | number,
    joinColumn = 'user',
  ) {
    const resource = await this.repo.findOne({
      where: {
        [`${joinColumn}`]: id,
        id: resourceId,
      },
    });

    return resource !== undefined;
  }
}
