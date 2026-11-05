// Very simple checks, enough for a front-end demo.
// A real shop would check the data again on the server.

export function isEmail(value: string): boolean {
  // something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isBlank(value: string): boolean {
  return value.trim() === '';
}

// Czech postal code: 5 digits, the space is optional ("602 00" or "60200")
export function isPostalCode(value: string): boolean {
  return /^\d{3}\s?\d{2}$/.test(value.trim());
}
