import { ProfileMock } from './profile-entity.mock';

export class ProfileRepositoryMock {
  save = jest.fn().mockResolvedValue(ProfileMock);
  update = jest.fn().mockResolvedValue(ProfileMock);
  delete = jest.fn().mockResolvedValue(ProfileMock);
  findOne = jest.fn().mockResolvedValue(ProfileMock);
}
