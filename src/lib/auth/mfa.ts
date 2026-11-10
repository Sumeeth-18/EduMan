import { generateSecret, verify, generateURI } from 'otplib';
import QRCode from 'qrcode';

export function generateTOTPSecret(): string {
  return generateSecret();
}

export function getTOTPUri(secret: string, email: string, issuer = 'EduMan.'): string {
  return generateURI({ secret, issuer, label: email });
}

export async function generateTOTPQRCode(secret: string, email: string, issuer = 'EduMan.'): Promise<string> {
  const uri = getTOTPUri(secret, email, issuer);
  return QRCode.toDataURL(uri);
}

export async function verifyTOTP(secret: string, token: string): Promise<boolean> {
  try {
    const result = await verify({ token, secret });
    return (result as { valid: boolean }).valid;
  } catch {
    return false;
  }
}

export function generateBackupCodes(count = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
  }
  return codes;
}

export function hashBackupCode(code: string): string {
  // In production, use bcrypt or similar
  // For backup codes, we store them hashed
  return code; // Placeholder - implement proper hashing
}

export function verifyBackupCode(storedCodes: string[], providedCode: string): { valid: boolean; remainingCodes: string[] } {
  const normalizedProvided = providedCode.replace(/-/g, '').toUpperCase();
  for (let i = 0; i < storedCodes.length; i++) {
    const normalizedStored = storedCodes[i].replace(/-/g, '').toUpperCase();
    if (normalizedStored === normalizedProvided) {
      const remaining = [...storedCodes];
      remaining.splice(i, 1);
      return { valid: true, remainingCodes: remaining };
    }
  }
  return { valid: false, remainingCodes: storedCodes };
}