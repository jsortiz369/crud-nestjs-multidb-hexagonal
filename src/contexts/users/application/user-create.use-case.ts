import { UserCreate } from '../domain/user.interface';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserExistByEmailService } from '../domain/services';
import { UuidRepository } from 'src/shared/uuid/domain/uuid.repository';

import * as vo from '../domain/vo';

export class UserCreateUserCase {
  /**
   * Creates an instance of UserCreateUserCase.
   * @date 2025-11-19 17:42:34
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UuidRepository} _uuidRepository
   * @param {UserExistByEmailService} _existByEmailService
   * @param {UserRepository} _userRepository
   */
  constructor(
    private readonly _uuidRepository: UuidRepository,
    private readonly _existByEmailService: UserExistByEmailService,
    private readonly _userRepository: UserRepository,
  ) {}

  /**
   * @description Create user
   * @date 2025-11-19 17:42:26
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserCreate} user
   * @returns {unknown}
   */
  async run(user: UserCreate) {
    // TODO: Validate exist user by email
    await this._existByEmailService.run(user.email);

    // TODO: Validations
    const userCreate = User.create({
      id: new vo.UserId(this._uuidRepository.generateUuid()),
      firstName: new vo.UserFirstName(user.firstName),
      secondName: user.secondName ? new vo.UserSecondName(user.secondName) : undefined,
      firstSurname: new vo.UserFirstSurname(user.firstSurname),
      secondSurname: user.secondSurname ? new vo.UserSecondSurname(user.secondSurname) : undefined,
      birthday: new vo.UserBirthday(user.birthday),
      phone: user.phone ? new vo.UserPhone(user.phone) : undefined,
      email: new vo.UserEmail(user.email),
      password: new vo.UserPassword(user.password),
      role: new vo.UserRole(user.role),
      status: new vo.UserStatus(user.status),
    });

    const result = await this._userRepository.create(userCreate);
    return result.toPrimitives();
  }
}
