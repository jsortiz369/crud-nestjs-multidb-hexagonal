import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { SortOrderType } from 'src/shared/system/domain/system.interface';

export class FindFilterDto {
  @IsOptional()
  @Transform(({ value }): number => (typeof value === 'string' && /^[0-9]+$/.test(value) ? Number(value) : value))
  @IsInt({ message: 'The page must be an integer' })
  @Min(1, { message: 'The page must be greater than 0' })
  readonly page: number = 1;

  @IsOptional()
  @Transform(({ value }): number => (typeof value === 'string' && /^[0-9]+$/.test(value) ? Number(value) : value))
  @IsInt({ message: 'The limit must be an integer' })
  @Max(100, { message: 'The limit must be less than 100' })
  @Min(5, { message: 'The limit must be greater than 5' })
  readonly limit: number = 10;

  @IsOptional()
  @IsEnum(SortOrderType, { message: 'The sort order must be ASC or DESC' })
  readonly sortOrder: SortOrderType = SortOrderType.ASC;
}
