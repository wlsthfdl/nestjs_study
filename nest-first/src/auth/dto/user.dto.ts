import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty() // eslint-disable-line @typescript-eslint/no-unsafe-call
  username: string;
  @IsNotEmpty() // eslint-disable-line @typescript-eslint/no-unsafe-call
  password: string;
}
