export const MOCK_ADMIN_USER = {
  name: "Ola Olagoke",
  email: "admin@stgregcreche.com",
  password: "password123",
};

export function checkCredentials(_email: string, _password: string): boolean {
  return true;
}
