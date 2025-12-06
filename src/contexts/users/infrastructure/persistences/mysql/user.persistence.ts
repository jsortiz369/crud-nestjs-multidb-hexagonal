import { $Enums } from 'generated/mysql/prisma';
import { UserRepository } from 'src/contexts/users/domain/repository';
import { User } from 'src/contexts/users/domain/user';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';
import { UserEmail, UserId } from 'src/contexts/users/domain/vo';
import { PrismaMysqlPersistence } from 'src/shared/database/infrastructure/persistences';
import { RoleType, StatusType } from 'src/shared/system/domain/system.interface';

export class UserPersistence implements UserRepository {
  constructor(private readonly _prisma: PrismaMysqlPersistence) {}

  async findOneById(id: UserId): Promise<User | null> {
    const result = await this._prisma.user.findFirst({
      where: { id: id._value },
    });
    if (!result) return null;

    const role = result.role == $Enums.Role.ADMIN ? RoleType.ADMIN : RoleType.USER;
    const status = result.status == $Enums.Status.ACTIVE ? StatusType.ACTIVE : StatusType.INACTIVE;
    return User.fromPrimitives({
      _id: result.id,
      firstName: result.firstName,
      secondName: result.secondName,
      firstSurname: result.firstSurname,
      secondSurname: result.secondSurname,
      birthday: result.birthday,
      email: result.email,
      password: result.password,
      phone: result.phone,
      role,
      status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
    } as UserPrimitive);
  }

  /**
   * @description validate exist email
   * @date 2025-12-05 17:23:31
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserEmail} email
   * @returns {Promise<boolean>}
   */
  async existByEmail(email: UserEmail, _id?: UserId): Promise<boolean> {
    const result = await this._prisma.user.findFirst({
      where: { email: email._value, id: { not: _id?._value }, deletedAt: null },
      select: { id: true },
    });
    return result !== null;
  }

  /**
   * @description Create user
   * @date 2025-12-05 17:23:17
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {User} data
   * @returns {Promise<User>}
   */
  async create(data: User): Promise<User> {
    const roleUser = data.role?._value == RoleType.ADMIN ? $Enums.Role.ADMIN : $Enums.Role.USER;
    const statusUser = data.status?._value == StatusType.ACTIVE ? $Enums.Status.ACTIVE : $Enums.Status.INACTIVE;

    await this._prisma.user.create({
      data: {
        id: data._id._value,
        firstName: data.firstName._value,
        secondName: data.secondName?._value,
        firstSurname: data.firstSurname._value,
        secondSurname: data.secondSurname?._value,
        birthday: data.birthday._value,
        phone: data.phone?._value,
        email: data.email._value,
        password: data.password._value,
        role: roleUser,
        status: statusUser,
        createdAt: data.createdAt._value,
        updatedAt: data.updatedAt._value,
      },
    });
    return data;
  }

  async update(id: UserId, data: User): Promise<User> {
    const roleUser = data.role?._value == RoleType.ADMIN ? $Enums.Role.ADMIN : $Enums.Role.USER;
    const statusUser = data.status?._value == StatusType.ACTIVE ? $Enums.Status.ACTIVE : $Enums.Status.INACTIVE;

    await this._prisma.user.update({
      data: {
        id: data._id._value,
        firstName: data.firstName._value,
        secondName: data.secondName?._value,
        firstSurname: data.firstSurname._value,
        secondSurname: data.secondSurname?._value,
        birthday: data.birthday._value,
        phone: data.phone?._value,
        email: data.email._value,
        password: data.password._value,
        role: roleUser,
        status: statusUser,
        createdAt: data.createdAt._value,
        updatedAt: data.updatedAt._value,
      },
      where: { id: id._value },
    });

    return data;
  }

  async delete(id: UserId): Promise<User> {
    await Promise.resolve(id);
    throw new Error('Method not implemented.');
  }
}
