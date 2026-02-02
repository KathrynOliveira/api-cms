const servicePath = "../../../src/services/authService";
import { authenticateUser } from "../../../src/services/authService";
import { ApiError } from "../../../src/errors/ApiError";

jest.mock("../../../src/services/authService", () => ({
  findUserByEmail: jest.fn(),
  validatePassword: jest.fn(),
  authenticateUser: jest.requireActual(servicePath).authenticateUser,
}));

const mockUser = {
  id: 1,
  email: "email@example.com",
  password: "senha",
  role: "AUTHOR",
};

describe("authenticateUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user for valid login", async () => {
    require(servicePath).findUserByEmail.mockResolvedValue(mockUser);
    require(servicePath).validatePassword.mockResolvedValue(true);
    const result = await authenticateUser({
      email: mockUser.email,
      password: mockUser.password,
    });
    expect(result).toMatchObject({
      id: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });
  });

  it("should throw error for invalid email", async () => {
    require(servicePath).findUserByEmail.mockResolvedValue(null);
    await expect(
      authenticateUser({
        email: "invalido@email.com",
        password: mockUser.password,
      }),
    ).rejects.toThrow(ApiError);
  });

  it("should throw error for invalid password", async () => {
    require(servicePath).findUserByEmail.mockResolvedValue(mockUser);
    require(servicePath).validatePassword.mockResolvedValue(false);
    await expect(
      authenticateUser({ email: mockUser.email, password: "errada" }),
    ).rejects.toThrow(ApiError);
  });

  it("should throw error for invalid login", async () => {
    require(servicePath).findUserByEmail.mockResolvedValue(null);
    require(servicePath).validatePassword.mockResolvedValue(false);
    await expect(
      authenticateUser({ email: "invalido@email.com", password: "errada" }),
    ).rejects.toThrow(ApiError);
  });
});
