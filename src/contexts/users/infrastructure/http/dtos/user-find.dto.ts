import { BadRequestException } from '@nestjs/common';
import { IsEnum, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, TransformFnParams, Type } from 'class-transformer';
import { FilterStringSearchItemDto, FindFilterDto } from 'src/shared/infrastructure/http/dtos';
import { UserSort } from 'src/contexts/users/domain/user.interface';
import { SearchOrFilters } from '../../decorators';

export class UserFilterItems {
  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterStringSearchItemDto, value))
  @IsObject({ message: 'The global filter must be a valid object' })
  @ValidateNested({ message: 'The global filter must be a valid object' })
  readonly global?: FilterStringSearchItemDto;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterStringSearchItemDto, value))
  @IsObject({ message: 'The email filter must be a valid object' })
  @ValidateNested({ message: 'The email filter must be a valid object' })
  readonly email?: FilterStringSearchItemDto;

  /* @IsOptional()
  @Transform(({ value }) => plainToInstance(FilterStringSearchItemDto, value))
  @IsObject({ message: 'The createdAt filter must be a valid object' })
  @ValidateNested({ message: 'The createdAt filter must be a valid object' })
  readonly createdAt?: FilterStringSearchItemDto; */
}

export class UserFindDto extends FindFilterDto {
  @IsOptional()
  @IsEnum(UserSort, {
    message:
      'The sort must be a valid value of the enum firstName | secondName | firstSurname | secondSurname | birthday | phone | email | status | role | createdAt | updatedAt',
  })
  readonly sort: UserSort = UserSort.CREATED_AT;

  @IsOptional()
  @Transform(
    ({ value }: TransformFnParams) => {
      try {
        const object = JSON.parse(value as string);
        return plainToInstance(UserFilterItems, object);
      } catch (_) {
        throw new BadRequestException('filters must be valid JSON');
      }
    },
    {
      toClassOnly: true,
    },
  )
  @Type(() => UserFilterItems)
  @ValidateNested({ message: 'The filters must be a valid object' })
  readonly filters?: UserFilterItems;

  @IsOptional()
  @IsString({ message: 'The search must be a string' })
  @MaxLength(100, { message: 'The search must be less than 100 characters' })
  readonly search?: string;

  @SearchOrFilters()
  private readonly _onlyOne?: any;
}
