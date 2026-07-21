const CODE_LENGTH = 8;

export function generateNumericCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

export function generateQRValue(crecheCode: string): string {
  return `ceven:${crecheCode}:${new Date().toISOString().split("T")[0]}`;
}

export function getCodeForToday(): { numeric: string; qrValue: string; date: string } {
  const today = new Date().toISOString().split("T")[0];
  const numeric = generateNumericCode();
  return {
    numeric,
    qrValue: generateQRValue(numeric),
    date: today,
  };
}

export function isCodeValid(code: string, expectedDate: string): boolean {
  const today = new Date().toISOString().split("T")[0];
  return expectedDate === today;
}

export function formatCodeDisplay(code: string): string {
  return code.replace(/(\d{4})(?=\d)/g, "$1 ");
}
