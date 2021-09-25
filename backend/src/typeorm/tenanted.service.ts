import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

export class TenantedService<T> extends BaseService<T> {
  constructor(protected readonly repo: Repository<T>) {
    super(repo);
  }

  async ownsResource(
    ownerId: string | number,
    resourceId: string | number,
    joinColumn = 'user',
  ) {
    const resource = await this.repo.findOne({
      where: {
        [`${joinColumn}`]: ownerId,
        id: resourceId,
      },
    });

    return resource !== undefined;
  }

  async findOneByUser(id: number | string, user: User) {
    return this.repo.findOne({
      where: {
        id,
        user: user.userUuid,
      },
    });
  }
}
