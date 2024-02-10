import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be a minimum of 8 characters')
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must include at least one uppercase letter',
  })
  .refine((password) => /\d/.test(password), {
    message: 'Password must include at least one number',
  })
  .refine((password) => /[!@#$%^&*?]/.test(password), {
    message: 'Password must include at least one special character',
  });
