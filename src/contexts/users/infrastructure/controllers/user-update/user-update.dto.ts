import { PartialType } from '@nestjs/mapped-types';

import { UserCreateDto } from '../user-create/user-update.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {}
