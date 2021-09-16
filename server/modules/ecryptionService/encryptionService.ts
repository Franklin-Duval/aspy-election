import bcrypt from 'bcryptjs';
const saltRounds = 10;

export class EncryptionService {
  static async hashPassword(passwordToHash: string) {
    return await bcrypt.hash(passwordToHash, saltRounds);
  }

  static async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
