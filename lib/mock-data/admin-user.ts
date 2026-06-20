export const MOCK_ADMIN_USER = {
  name: "Ola Olagoke",
  email: "admin@stgregcreche.com",
  password: "password123",
};

export function checkCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === MOCK_ADMIN_USER.email.toLowerCase() &&
    password === MOCK_ADMIN_USER.password
  );
}
