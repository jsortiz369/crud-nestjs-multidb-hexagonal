import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { MatchModeEnumType, MatchModeNumberType, MatchModeStringType } from 'src/shared/domain/interfaces';

export class FilterStringSearchItemDto {
  @IsString({ message: 'The filter value must be a string' })
  @IsNotEmpty({ message: 'The filter value must not be empty' })
  @MaxLength(100, { message: `The filter value must not exceed 100 characters` })
  readonly value: string;

  @IsEnum(MatchModeStringType, { message: 'The match mode must be startsWith | contains | notContains| endsWith | equals | notEquals' }) // startsWith | contains | notContains| endsWith | equals | notEquals
  readonly matchMode: MatchModeStringType;
}

export class FilterEnumSearchItemDto {
  @IsString({ message: 'The filter value must be a string' })
  @IsNotEmpty({ message: 'The filter value must not be empty' })
  @MaxLength(100, { message: `The filter value must not exceed 100 characters` })
  readonly value: string;

  @IsEnum(MatchModeEnumType, { message: 'The match mode must be equals | notEquals' }) // startsWith | contains | notContains| endsWith | equals | notEquals
  readonly matchMode: MatchModeEnumType;
}

export class FilterNumberSearchItemDto {
  @IsNotEmpty({ message: 'The filter value must not be empty' })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 10 }, { message: 'The filter value must be a number' })
  readonly value: number;

  @IsEnum(MatchModeNumberType, { message: 'The match mode must be equals | notEquals' }) // startsWith | contains | notContains| endsWith | equals | notEquals
  readonly matchMode: MatchModeNumberType;
}
