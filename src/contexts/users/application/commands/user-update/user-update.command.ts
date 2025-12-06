import { DataNotEmptyException } from 'src/shared/system/domain/exceptions';
import { UserCreateCommand } from '../user-create';

type TypeCommand = Partial<InstanceType<typeof UserCreateCommand>>;

export class UserUpdateCommand implements Partial<UserCreateCommand> {
  /**
   * Creates an instance of UserUpdateCommand.
   * @date 2025-12-05 22:59:23
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {TypeCommand['firstName']} firstName
   * @param {TypeCommand['secondName']} secondName
   * @param {TypeCommand['firstSurname']} firstSurname
   * @param {TypeCommand['secondSurname']} secondSurname
   * @param {TypeCommand['birthday']} birthday
   * @param {TypeCommand['phone']} phone
   * @param {TypeCommand['email']} email
   * @param {TypeCommand['password']} password
   * @param {TypeCommand['role']} role
   * @param {TypeCommand['status']} status
   */
  constructor(
    readonly firstName: TypeCommand['firstName'],
    readonly secondName: TypeCommand['secondName'],
    readonly firstSurname: TypeCommand['firstSurname'],
    readonly secondSurname: TypeCommand['secondSurname'],
    readonly birthday: TypeCommand['birthday'],
    readonly phone: TypeCommand['phone'],
    readonly email: TypeCommand['email'],
    readonly password: TypeCommand['password'],
    readonly role: TypeCommand['role'],
    readonly status: TypeCommand['status'],
  ) {
    this.validateExistDataUpdate();
  }

  /**
   * @description Validate exist data for update
   * @date 2025-12-05 22:59:29
   * @author Jogan Ortiz Muñoz
   *
   * @private
   */
  private validateExistDataUpdate() {
    const data = Object.values(this).filter((value) => value !== undefined);
    if (data.length === 0) throw new DataNotEmptyException();
  }
}
