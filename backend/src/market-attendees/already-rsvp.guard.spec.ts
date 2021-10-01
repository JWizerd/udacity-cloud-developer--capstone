import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { AlreadyRsvpGuard } from './already-rsvp.guard';

describe('AlreadyRsvpGuard', () => {
  it('should be defined', () => {
    expect(
      new AlreadyRsvpGuard(ServiceMock as any, AuthServiceMock as any),
    ).toBeDefined();
  });
});
