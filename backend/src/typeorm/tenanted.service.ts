import { Repository } from 'typeorm';
import { BaseService } from './base.service';

export class TenantedService<T> extends BaseService<T> {
  constructor(protected readonly repo: Repository<T>) {
    super(repo);
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
