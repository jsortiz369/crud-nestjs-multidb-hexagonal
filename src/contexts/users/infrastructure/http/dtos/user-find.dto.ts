import { IsEnum, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform } from 'class-transformer';
import { FilterSearchItemDto, FindFilterDto } from 'src/shared/infrastructure/http/dtos';
import { UserSort } from 'src/contexts/users/domain/user.interface';

export class UserFilterItems {
  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterSearchItemDto, value))
  @IsObject({ message: 'The global filter must be a valid object' })
  @ValidateNested({ message: 'The global filter must be a valid object' })
  readonly global?: FilterSearchItemDto;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterSearchItemDto, value))
  @IsObject({ message: 'The email filter must be a valid object' })
  @ValidateNested({ message: 'The email filter must be a valid object' })
  readonly email?: FilterSearchItemDto;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterSearchItemDto, value))
  @IsObject({ message: 'The createdAt filter must be a valid object' })
  @ValidateNested({ message: 'The createdAt filter must be a valid object' })
  readonly createdAt?: FilterSearchItemDto;
}

export class UserFindDto extends FindFilterDto {
  @IsOptional()
  @IsEnum(UserSort, {
    message:
      'The sort must be a valid value of the enum firstName | secondName | firstSurname | secondSurname | birthday | phone | email | status | role | createdAt | updatedAt',
  })
  readonly sort: UserSort = UserSort.CREATED_AT;

  @IsOptional()
  @Transform(({ value }: { value: string }) => plainToInstance(UserFilterItems, value && JSON.parse(value)), { toClassOnly: true })
  @ValidateNested({ message: 'The filters must be a valid object' })
  readonly filters?: UserFilterItems = undefined;
}
