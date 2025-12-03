import { BadRequestException } from '@nestjs/common';

export class InvalidUuidException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
