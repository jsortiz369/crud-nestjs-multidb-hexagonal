import { IsUUID } from 'class-validator';

export class UuidDto {
  @IsUUID('4', { message: 'The uuid is not valid must be a uuid v4' })
  readonly id: string;
}
