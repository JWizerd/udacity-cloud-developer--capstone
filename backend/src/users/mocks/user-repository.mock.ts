import { UserMock } from './user-entity.mock';

export class UserRepositoryMock {
  save = jest.fn().mockResolvedValue(UserMock);
  update = jest.fn().mockResolvedValue(UserMock);
  delete = jest.fn().mockResolvedValue(UserMock);
  findOne = jest.fn().mockResolvedValue(UserMock);
}
