import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './user-update.dto';
import { ROUTES } from 'src/app/http/routes';
import { UserCreateCommand, UserCreateHandler } from 'src/contexts/users/application';

@Controller(ROUTES.USERS)
export class UserCreateController {
  /**
   * Creates an instance of UserCreateController.
   * @date 2025-12-05 16:05:02
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserCreateHandler} _handler
   */
  constructor(private readonly _handler: UserCreateHandler) {}

  @Post()
  async execute(@Body() body: UserCreateDto) {
    // TODO: call handler to create user
    const result = await this._handler.execute(
      new UserCreateCommand(
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
