import { registerDecorator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'SearchOrFilters', async: false })
class SearchOrFiltersConstraint implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const obj: any = args.object;

    const hasSearch = obj.search !== undefined && obj.search !== null;
    const hasFilters = obj.filters !== undefined && obj.filters !== null;

    return !(hasSearch && hasFilters);
  }

  defaultMessage() {
    return 'You can provide either "search" or "filters", but not both.';
  }
}

export function SearchOrFilters() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: SearchOrFiltersConstraint,
    });
  };
}
