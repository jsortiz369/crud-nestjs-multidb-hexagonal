import { PrismaMysqlPersistence } from 'src/shared/infrastructure/persistences';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { DataFind, RoleType, StatusType } from 'src/shared/domain/interfaces';
import { $Enums } from 'generated/mysql/prisma';
import { UserEmail, UserId } from '../../domain/vo';
import { UserFind, UserPrimitive } from '../../domain/user.interface';
import { FiledType, FilterType } from 'src/shared/infrastructure/persistences/prisma-mysql.persistence';

export class UserMysqlPersistence implements UserRepository {
  /**
   * Creates an instance of UserMysqlPersistence.
   * @date 2025-11-19 16:58:47
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {PrismaMysqlPersistence} _prisma
   */
  constructor(private readonly _prisma: PrismaMysqlPersistence) {}

  /**
   * @description Get all users
   * @date 2025-11-19 18:48:29
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserFind} userFind
   * @returns {Promise<DataFind<User>>}
   */
  async find(userFind: UserFind): Promise<DataFind<User>> {
    const { page, limit, sortOrder, sort, filters } = userFind;

    const where: any = { deletedAt: null };

    // TODO: Total users
    const total = await this._prisma.user.count({ where: { ...where } });

    // TODO: Field filter
    const filterCampos: FiledType[] = [
      { value: 'firstName', type: 'string' },
      { value: 'secondName', type: 'string' },
      { value: 'firstSurname', type: 'string' },
      { value: 'secondSurname', type: 'string' },
      { value: 'birthday', type: 'Date' },
      { value: 'phone', type: 'string' },
      { value: 'email', type: 'string' },
      {
        value: 'status',
        type: 'enum',
        callback: (value: string) =>
          value.toLowerCase() === 'activo' ? $Enums.Status.ACTIVE : value.toLowerCase() === 'inactivo' ? $Enums.Status.INACTIVE : undefined,
      },
      {
        value: 'role',
        type: 'enum',
        callback: (value: string) =>
          value.toLowerCase() === 'admin' ? $Enums.Role.ADMIN : value.toLowerCase() === 'usuario' ? $Enums.Role.USER : undefined,
      },
      { value: 'createdAt', type: 'Date' },
      { value: 'updatedAt', type: 'Date' },
    ];
    if (filters?.global?.value !== undefined) {
      where.OR = filterCampos.map((_) => this._prisma.globalFilter(_, filters.global!.value)).filter((_) => _ !== null);
    } else {
      filterCampos.forEach((_) => {
        if (!filters || !filters?.[_.value] || filters?.[_.value]?.value === undefined) return;
        const filter = this._prisma.fieldFilter(_, filters[_.value] as FilterType);
        if (filter == null) return;
        where.AND ??= [];
        where.AND.push(filter);
      });
    }

    // TODO: total users
    const totalFilters = await this._prisma.user.count({ where });

    // TODO: users
    const result = await this._prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        secondName: true,
        firstSurname: true,
        secondSurname: true,
        birthday: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: sortOrder },
    });

    return {
      data: result.map((_) => {
        const { role, status, ...restResult } = _;
        return User.fromPrimitives({
          ...restResult,
          role: role == $Enums.Role.ADMIN ? RoleType.ADMIN : RoleType.USER,
          status: status == $Enums.Status.ACTIVE ? StatusType.ACTIVE : StatusType.INACTIVE,
        } as UserPrimitive);
      }),
      meta: {
        total: total,
        filter: totalFilters != total ? totalFilters : undefined,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  /**
   * @description Get User Find by Id
   * @date 2025-11-19 17:25:40
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserId} id
   * @returns {Promise<User | null>}
   */
  async findOneById(id: UserId): Promise<User | null> {
    const result = await this._prisma.user.findFirst({
      where: { id: id._value, deletedAt: null },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        firstSurname: true,
        secondSurname: true,
        birthday: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (result === null) return null;

    const { role, status, ...restResult } = result;
    return User.fromPrimitives({
      ...restResult,
      role: role == $Enums.Role.ADMIN ? RoleType.ADMIN : RoleType.USER,
      status: status == $Enums.Status.ACTIVE ? StatusType.ACTIVE : StatusType.INACTIVE,
    } as UserPrimitive);
  }

  /**
   * @description Get User Find by Email
   * @date 2025-11-19 17:25:40
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserEmail} email
   * @param {?UserId} [_id]
   * @returns {Promise<User | null>}
   */
  async findOneByEmail(email: UserEmail, _id?: UserId): Promise<User | null> {
    const result = await this._prisma.user.findFirst({
      where: {
        email: email._value,
        id: { not: _id?._value },
        deletedAt: null,
      },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        firstSurname: true,
        secondSurname: true,
        birthday: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (result === null) return null;

    const { role, status, ...restResult } = result;
    return User.fromPrimitives({
      ...restResult,
      role: role == $Enums.Role.ADMIN ? RoleType.ADMIN : RoleType.USER,
      status: status === $Enums.Status.ACTIVE ? StatusType.ACTIVE : StatusType.INACTIVE,
    } as UserPrimitive);
  }

  /**
   * @description  Create user
   * @date 2025-11-19 16:58:56
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {User} user
   * @returns {Promise<User>}
   */
  async create(user: User): Promise<User> {
    const created = new Date();
    const result = await this._prisma.user.create({
      data: {
        id: user._id._value,
        firstName: user.firstName._value,
        secondName: user.secondName?._value,
        firstSurname: user.firstSurname._value,
        secondSurname: user.secondSurname?._value,
        birthday: user.birthday._value,
        phone: user.phone?._value,
        email: user.email._value,
        password: user.password._value,
        role: user.role?._value == RoleType.ADMIN ? $Enums.Role.ADMIN : $Enums.Role.USER,
        status: user.status?._value == StatusType.ACTIVE ? $Enums.Status.ACTIVE : $Enums.Status.INACTIVE,
        createdAt: created,
        updatedAt: created,
      },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        firstSurname: true,
        secondSurname: true,
        birthday: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const { role, status, ...restResult } = result;
    return User.fromPrimitives({
      ...restResult,
      role: role == 'ADMIN' ? RoleType.ADMIN : RoleType.USER,
      status: status === 'ACTIVE' ? StatusType.ACTIVE : StatusType.INACTIVE,
    } as UserPrimitive);
  }

  /**
   * @description User update by id
   * @date 2025-11-19 17:41:28
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {User} user
   * @returns {Promise<User>}
   */
  async update(user: User): Promise<User> {
    const updated = new Date();
    const result = await this._prisma.user.update({
      data: {
        firstName: user.firstName._value,
        secondName: user.secondName?._value,
        firstSurname: user.firstSurname._value,
        secondSurname: user.secondSurname?._value,
        birthday: user.birthday._value,
        phone: user.phone?._value,
        email: user.email._value,
        role: user.role?._value == RoleType.ADMIN ? $Enums.Role.ADMIN : $Enums.Role.USER,
        status: user.status?._value == StatusType.ACTIVE ? $Enums.Status.ACTIVE : $Enums.Status.INACTIVE,
        updatedAt: updated,
      },
      where: { id: user._id._value },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        firstSurname: true,
        secondSurname: true,
        birthday: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const { role, status, ...restResult } = result;
    return User.fromPrimitives({
      ...restResult,
      role: role == 'ADMIN' ? RoleType.ADMIN : RoleType.USER,
      status: status === 'ACTIVE' ? StatusType.ACTIVE : StatusType.INACTIVE,
    } as UserPrimitive);
  }

  /**
   * @description User delete by id
   * @date 2025-11-19 17:41:28
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserId} id
   * @returns {Promise<User>}
   */
  async delete(id: UserId): Promise<User> {
    const deleted = new Date();
    const result = await this._prisma.user.update({
      data: {
        status: $Enums.Status.INACTIVE,
        updatedAt: deleted,
        deletedAt: deleted,
      },
      where: { id: id._value },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        firstSurname: true,
        secondSurname: true,
        birthday: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const { role, status, ...restResult } = result;
    return User.fromPrimitives({
      ...restResult,
      role: role == 'ADMIN' ? RoleType.ADMIN : RoleType.USER,
      status: status === 'ACTIVE' ? StatusType.ACTIVE : StatusType.INACTIVE,
    } as UserPrimitive);
  }
}
