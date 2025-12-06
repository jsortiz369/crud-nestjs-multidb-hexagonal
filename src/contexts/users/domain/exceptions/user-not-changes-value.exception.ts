import { BadRequestException } from '@nestjs/common';

export class UserNotChangesValueException extends BadRequestException {
  constructor() {
    super('User not changes value');
  }
}
