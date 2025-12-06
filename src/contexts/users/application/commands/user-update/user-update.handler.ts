import { UserRepository } from 'src/contexts/users/domain/repository';
import { UserUpdateCommand } from './user-update.command';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';
import { UserFindOneByIdService } from 'src/contexts/users/domain/service';
import { UserConflictEmailException, UserNotChangesValueException } from 'src/contexts/users/domain/exceptions';
import { User } from 'src/contexts/users/domain/user';

export class UserUpdateHandler {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userFindOneByIdService: UserFindOneByIdService,
  ) {}

  async execute(id: string, command: UserUpdateCommand): Promise<Omit<UserPrimitive, 'password'>> {
    // TODO: validate exist user by ID
    const user = await this._userFindOneByIdService.execute(id);

    // TODO: Validate has changes values
    const hasChangesValues = this.validateExistChangesValues(command, user);
    if (!hasChangesValues) throw new UserNotChangesValueException();

    // TODO: update user
    if (command.firstName !== undefined) user.firstName = command.firstName;
    if (command.secondName !== undefined) user.secondName = command.secondName;
    if (command.firstSurname !== undefined) user.firstSurname = command.firstSurname;
    if (command.secondSurname !== undefined) user.secondSurname = command.secondSurname;
    if (command.birthday !== undefined) user.birthday = command.birthday;
    if (command.phone !== undefined) user.phone = command.phone;
    if (command.email !== undefined) user.email = command.email;
    if (command.password !== undefined) user.password = command.password;
    if (command.role !== undefined) user.role = command.role;
    if (command.status !== undefined) user.status = command.status;

    // TODO: Validate existing user by email
    const exists = await this._userRepository.existByEmail(user.email, user._id);
    if (exists) throw new UserConflictEmailException();

    // TODO: update user
    user.updatedAt = new Date();
    const updatedUser = await this._userRepository.update(user._id, user);

    // TODO: return user values primitives
    const userPrimitive = updatedUser.toValuesPrimitives();
    return {
      _id: userPrimitive._id,
      firstName: userPrimitive.firstName,
      secondName: userPrimitive.secondName,
      firstSurname: userPrimitive.firstSurname,
      secondSurname: userPrimitive.secondSurname,
      birthday: userPrimitive.birthday,
      phone: userPrimitive.phone,
      email: userPrimitive.email,
      role: userPrimitive.role,
      status: userPrimitive.status,
      createdAt: userPrimitive.createdAt,
      updatedAt: userPrimitive.updatedAt,
    };
  }

  /**
   * @description Validate exist changes values
   * @date 2025-12-05 23:06:57
   * @author Jogan Ortiz Muñoz
   *
   * @private
   * @param {UserUpdateCommand} command
   * @param {User} user
   * @returns {boolean}
   */
  private validateExistChangesValues(command: UserUpdateCommand, user: User): boolean {
    if (command.firstName && command.firstName !== user.firstName._value) return true;
    if (command.secondName && command.secondName !== user.secondName?._value) return true;
    if (command.firstSurname && command.firstSurname !== user.firstSurname._value) return true;
    if (command.secondSurname && command.secondSurname !== user.secondSurname?._value) return true;
    if (command.birthday && command.birthday !== user.birthday._value) return true;
    if (command.phone && command.phone !== user.phone._value) return true;
    if (command.email && command.email !== user.email._value) return true;
    if (command.password && command.password !== user.password._value) return true;
    if (command.role && command.role !== user.role._value) return true;
    if (command.status && command.status !== user.status._value) return true;
    return false;
  }
}
