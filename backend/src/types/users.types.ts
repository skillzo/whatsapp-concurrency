export interface CreateUserDto {
  name: string;
  phoneNumber: string;
}

export interface UpdateUserDto {
  name?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}
