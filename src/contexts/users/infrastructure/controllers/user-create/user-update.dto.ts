import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxDate, MinDate } from 'class-validator';

import { REGEX } from 'src/shared/system/domain/constants';
import { RoleType, StatusType } from 'src/shared/system/domain/system.interface';

export class UserCreateDto {
  @IsString({ message: 'The first name is not valid must be a string' })
  @IsNotEmpty({ message: 'The first name is not empty' })
  @Length(2, 25, { message: 'The first name must be between 2 and 25 characters' })
  @Matches(REGEX.LETTER_NUMBER_SPACE, { message: 'The first name not valid must be letters, numbers and space' })
  readonly firstName: string;

  @IsOptional()
  @IsString({ message: 'The second name is not valid must be a string' })
  @IsNotEmpty({ message: 'The second name is not empty' })
  @Length(2, 25, { message: 'The second name must be between 2 and 25 characters' })
  @Matches(REGEX.LETTER_NUMBER_SPACE, { message: 'The second name not valid must be letters, numbers and space' })
  readonly secondName?: string;

  @IsString({ message: 'The first surname is not valid must be a string' })
  @IsNotEmpty({ message: 'The first surname is not empty' })
  @Length(2, 25, { message: 'The first surname must be between 2 and 25 characters' })
  @Matches(REGEX.LETTER_NUMBER_SPACE, { message: 'The first surname not valid must be letters, numbers and space' })
  readonly firstSurname: string;

  @IsOptional()
  @IsString({ message: 'The second surname is not valid must be a string' })
  @IsNotEmpty({ message: 'The second surname is not empty' })
  @Length(2, 25, { message: 'The second surname must be between 2 and 25 characters' })
  @Matches(REGEX.LETTER_NUMBER_SPACE, { message: 'The second surname not valid must be letters, numbers and space' })
  readonly secondSurname?: string;

  @IsDate({ message: 'The birthday is not valid must be a date' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'The birthday is not empty' })
  @MinDate(new Date('1900-01-01'), { message: 'The birthday cannot be before 1900' })
  @MaxDate(new Date(), { message: 'The birthday cannot be in the future' })
  readonly birthday: Date;

  @IsOptional()
  @IsString({ message: 'The phone is not valid must be a string' })
  @IsNotEmpty({ message: 'The phone is not empty' })
  @Matches(REGEX.PHONE, { message: 'The phone not valid must be a phone' })
  readonly phone?: string;

  @IsString({ message: 'The email is not valid must be a string' })
  @IsNotEmpty({ message: 'The email is not empty' })
  @Matches(REGEX.EMAIL, { message: 'The email not valid must be a email' })
  @Length(5, 100, { message: 'The email must be between 5 and 100 characters' })
  readonly email: string;

  @IsString({ message: 'The password is not valid must be a string' })
  @IsNotEmpty({ message: 'The password is not empty' })
  @Length(8, 20, { message: 'The password must be between 8 and 20 characters' })
  readonly password: string;

  @IsOptional()
  @IsEnum(StatusType, { message: 'The status is not valid' })
  readonly status: StatusType;

  @IsOptional()
  @IsEnum(RoleType, { message: 'The role is not valid' })
  readonly role: RoleType;
}
