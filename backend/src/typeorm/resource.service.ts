import { paginate } from 'nestjs-typeorm-paginate';
import { DeepPartial, Repository } from 'typeorm';
import { IBaseService } from '../typeorm/resource-service.interface';
import { BaseService } from './base.service';

export class ResourceService<T>
  extends BaseService<T>
  implements IBaseService<T>
{
  constructor(
    protected readonly repo: Repository<T>,
    protected readonly paginator = paginate,
  ) {
    super(repo, paginator);
  }

  async create(payload: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(payload);
    return this.repo.save(entity);
  }

  async findOne(id: number | string): Promise<T> {
    return this.repo.findOne(id);
  }
}
