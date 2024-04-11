export interface User {
    id?: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    encryptedPassword: string;
    emailVerificationToken?: string;
    emailVerificationStatus?: boolean;
  }
  