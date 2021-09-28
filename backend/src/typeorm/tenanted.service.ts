import { Repository } from 'typeorm';
import { BaseService } from './base.service';
import { IUser } from 'src/users/user.interface';

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

  async findOneByUser(id: number | string, user: IUser) {
    return this.repo.findOne({
      where: {
        id,
        user: user.userUuid,
      },
    });
  }
}
