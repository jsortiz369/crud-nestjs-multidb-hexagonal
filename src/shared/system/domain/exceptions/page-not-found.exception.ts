import { NotFoundException } from '@nestjs/common';

export class PageNotFoundException extends NotFoundException {
  constructor() {
    super('The page does not exist');
  }
}
