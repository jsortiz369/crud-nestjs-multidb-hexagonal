import { BadRequestException } from '@nestjs/common';

export class DataNotEmptyException extends BadRequestException {
  constructor() {
    super('The data is not empty');
  }
}
