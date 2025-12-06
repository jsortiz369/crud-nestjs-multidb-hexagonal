import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UuidDto } from 'src/app/http/dto';
import { ROUTES } from 'src/app/http/routes';
import { UserUpdateCommand, UserUpdateHandler } from 'src/contexts/users/application';
import { UserUpdateDto } from './user-update.dto';

@Controller(ROUTES.USERS)
export class UserUpdateController {
  constructor(private readonly _handler: UserUpdateHandler) {}

  @Patch(':id')
  async execute(@Param() param: UuidDto, @Body() body: UserUpdateDto) {
    const result = await this._handler.execute(
      param.id,
      new UserUpdateCommand(
        body.firstName,
        body.secondName,
        body.firstSurname,
        body.secondSurname,
        body.birthday,
        body.phone,
        body.email,
        body.password,
        body.role,
        body.status,
      ),
    );

    return result;
  }
}
