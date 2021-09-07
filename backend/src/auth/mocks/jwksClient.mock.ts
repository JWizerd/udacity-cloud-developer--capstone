export class jwksClientMock {
  getSigningKey = jest.fn().mockReturnThis();
  getPublicKey = jest.fn();
}
