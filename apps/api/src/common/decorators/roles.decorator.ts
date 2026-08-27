import { SetMetadata } from '@nestjs/common';
export type Role = 'PATIENT' | 'DOCTOR' | 'NURSE' | 'ADMIN' | 'SYSTEM_ADMIN';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
