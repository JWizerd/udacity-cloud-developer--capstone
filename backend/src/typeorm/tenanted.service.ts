import { Repository } from 'typeorm';
import { BaseService } from './base.service';
import { IUser } from '../users/user.interface';

export class TenantedService<T> extends BaseService<T> {
  constructor(protected readonly repo: Repository<T>) {
    super(repo);
  }

  async ownsResource(
    ownerId: string | number,
    resourceId: number,
    joinColumn = 'userId',
  ) {
    const queryBuilder = this.repo.createQueryBuilder('r');

    const record = await queryBuilder
      .where('r.id = :resourceId', { resourceId })
      .andWhere(`r.${joinColumn} = :ownerId`, { ownerId })
      .getOne();

    return record !== undefined;
  }

  async findOneByUser(id: number | string, user: IUser) {
    const queryBuilder = this.repo.createQueryBuilder('r');

    return await queryBuilder
      .where('r.id = :id', { id })
      .andWhere('r.userId = :userId', { userId: user.id })
      .getOne();
  }
}
