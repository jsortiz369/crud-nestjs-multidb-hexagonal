import { UserCreatePrimitive, UserPrimitive } from './user.interface';
import * as vo from './vo';

interface UserVO {
  _id: vo.UserId;
  firstName: vo.UserFirstName;
  secondName: vo.UserSecondName;
  firstSurname: vo.UserFirstSurname;
  secondSurname: vo.UserSecondSurname;
  birthday: vo.UserBirthday;
  phone: vo.UserPhone;
  email: vo.UserEmail;
  photo: vo.UserPhoto;
  password: vo.UserPassword;
  status: vo.UserStatus;
  role: vo.UserRole;
  createdAt: vo.UserCreatedAt;
  updatedAt: vo.UserUpdatedAt;
  deletedAt: vo.UserDeletedAt;
}

export class User {
  private _idVO: vo.UserId;
  private firstNameVO: vo.UserFirstName;
  private secondNameVO: vo.UserSecondName;
  private firstSurnameVO: vo.UserFirstSurname;
  private secondSurnameVO: vo.UserSecondSurname;
  private birthdayVO: vo.UserBirthday;
  private phoneVO: vo.UserPhone;
  private emailVO: vo.UserEmail;
  private photoVO: vo.UserPhoto;
  private passwordVO: vo.UserPassword;
  private statusVO: vo.UserStatus;
  private roleVO: vo.UserRole;
  private createdAtVO: vo.UserCreatedAt;
  private updatedAtVO: vo.UserUpdatedAt;
  private deletedAtVO?: vo.UserDeletedAt;

  /**
   * Creates an instance of User.
   * @date 2025-11-19 16:11:08
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserVO} vo
   */
  constructor(vo: UserVO) {
    this._idVO = vo._id;
    this.firstNameVO = vo.firstName;
    this.secondNameVO = vo.secondName;
    this.firstSurnameVO = vo.firstSurname;
    this.secondSurnameVO = vo.secondSurname;
    this.birthdayVO = vo.birthday;
    this.phoneVO = vo.phone;
    this.emailVO = vo.email;
    this.photoVO = vo.photo;
    this.passwordVO = vo.password;
    this.statusVO = vo.status;
    this.roleVO = vo.role;
    this.createdAtVO = vo.createdAt;
    this.updatedAtVO = vo.updatedAt;
    this.deletedAtVO = vo.deletedAt;
  }

  set firstName(firstName: InstanceType<typeof vo.UserFirstName>['_value']) {
    this.firstNameVO = new vo.UserFirstName(firstName);
  }

  set secondName(secondName: InstanceType<typeof vo.UserSecondName>['_value']) {
    this.secondNameVO = new vo.UserSecondName(secondName);
  }

  set firstSurname(firstSurname: InstanceType<typeof vo.UserFirstSurname>['_value']) {
    this.firstSurnameVO = new vo.UserFirstSurname(firstSurname);
  }

  set secondSurname(secondSurname: InstanceType<typeof vo.UserSecondSurname>['_value']) {
    this.secondSurnameVO = new vo.UserSecondSurname(secondSurname);
  }

  set birthday(birthday: InstanceType<typeof vo.UserBirthday>['_value']) {
    this.birthdayVO = new vo.UserBirthday(birthday);
  }

  set email(email: InstanceType<typeof vo.UserEmail>['_value']) {
    this.emailVO = new vo.UserEmail(email);
  }

  set phone(phone: InstanceType<typeof vo.UserPhone>['_value']) {
    this.phoneVO = new vo.UserPhone(phone);
  }

  set photo(photo: InstanceType<typeof vo.UserPhoto>['_value']) {
    this.photoVO = new vo.UserPhoto(photo);
  }

  set password(password: InstanceType<typeof vo.UserPassword>['_value']) {
    this.passwordVO = new vo.UserPassword(password);
  }

  set status(status: InstanceType<typeof vo.UserStatus>['_value']) {
    this.statusVO = new vo.UserStatus(status);
  }

  set role(role: InstanceType<typeof vo.UserRole>['_value']) {
    this.roleVO = new vo.UserRole(role);
  }

  set updatedAt(updatedAt: InstanceType<typeof vo.UserUpdatedAt>['_value']) {
    this.updatedAtVO = new vo.UserUpdatedAt(updatedAt);
  }

  set deletedAt(deletedAt: InstanceType<typeof vo.UserDeletedAt>['_value']) {
    this.deletedAtVO = new vo.UserDeletedAt(deletedAt);
  }

  get firstName(): vo.UserFirstName {
    return this.firstNameVO;
  }

  get secondName(): vo.UserSecondName {
    return this.secondNameVO;
  }

  get firstSurname(): vo.UserFirstSurname {
    return this.firstSurnameVO;
  }

  get secondSurname(): vo.UserSecondSurname {
    return this.secondSurnameVO;
  }

  get birthday(): vo.UserBirthday {
    return this.birthdayVO;
  }

  get email(): vo.UserEmail {
    return this.emailVO;
  }

  get phone(): vo.UserPhone {
    return this.phoneVO;
  }

  get photo(): vo.UserPhoto {
    return this.photoVO;
  }

  get password(): vo.UserPassword {
    return this.passwordVO;
  }

  get status(): vo.UserStatus {
    return this.statusVO;
  }

  get role(): vo.UserRole {
    return this.roleVO;
  }

  get createdAt(): vo.UserCreatedAt {
    return this.createdAtVO;
  }

  get updatedAt(): vo.UserUpdatedAt {
    return this.updatedAtVO;
  }

  get deletedAt(): vo.UserDeletedAt | undefined {
    return this.deletedAtVO;
  }

  get _id(): vo.UserId {
    return this._idVO;
  }

  /**
   * @description Prepare entity by create user
   * @date 2025-12-05 12:26:09
   * @author Jogan Ortiz Muñoz
   *
   * @static
   * @param {UserCreatePrimitive} primitive
   * @returns {User}
   */
  static create(primitive: UserCreatePrimitive): User {
    const newCreatedAt = new Date();
    return new User({
      _id: new vo.UserId(primitive._id),
      firstName: new vo.UserFirstName(primitive.firstName),
      secondName: new vo.UserSecondName(primitive.secondName),
      firstSurname: new vo.UserFirstSurname(primitive.firstSurname),
      secondSurname: new vo.UserSecondSurname(primitive.secondSurname),
      birthday: new vo.UserBirthday(primitive.birthday),
      phone: new vo.UserPhone(primitive.phone),
      email: new vo.UserEmail(primitive.email),
      photo: new vo.UserPhoto(primitive.photo),
      password: new vo.UserPassword(primitive.password),
      status: new vo.UserStatus(primitive.status),
      role: new vo.UserRole(primitive.role),
      createdAt: new vo.UserCreatedAt(newCreatedAt),
      updatedAt: new vo.UserUpdatedAt(newCreatedAt),
      deletedAt: undefined as unknown as vo.UserDeletedAt,
    });
  }

  static fromPrimitives(primitive: UserPrimitive): User {
    return new User({
      _id: new vo.UserId(primitive._id),
      firstName: new vo.UserFirstName(primitive.firstName),
      secondName: new vo.UserSecondName(primitive.secondName),
      firstSurname: new vo.UserFirstSurname(primitive.firstSurname),
      secondSurname: new vo.UserSecondSurname(primitive.secondSurname),
      birthday: new vo.UserBirthday(primitive.birthday),
      phone: new vo.UserPhone(primitive.phone),
      email: new vo.UserEmail(primitive.email),
      photo: new vo.UserPhoto(primitive.photo),
      password: new vo.UserPassword(primitive.password),
      status: new vo.UserStatus(primitive.status),
      role: new vo.UserRole(primitive.role),
      createdAt: new vo.UserCreatedAt(primitive.createdAt),
      updatedAt: new vo.UserUpdatedAt(primitive.updatedAt),
      deletedAt: primitive.deletedAt ? new vo.UserDeletedAt(primitive.deletedAt) : (undefined as unknown as vo.UserDeletedAt),
    });
  }

  /**
   * @description All values the User
   * @date 2025-12-05 12:54:16
   * @author Jogan Ortiz Muñoz
   *
   * @returns {ToPrimitives}
   */
  toValuesPrimitives(): UserPrimitive {
    return {
      _id: this._idVO._value,
      firstName: this.firstNameVO._value,
      secondName: this.secondNameVO._value,
      firstSurname: this.firstSurnameVO._value,
      secondSurname: this.secondSurnameVO._value,
      birthday: this.birthdayVO._value,
      phone: this.phoneVO._value,
      email: this.emailVO._value,
      photo: this.photoVO._value,
      password: this.passwordVO._value,
      status: this.statusVO._value,
      role: this.roleVO._value,
      createdAt: this.createdAtVO._value,
      updatedAt: this.updatedAtVO._value,
      deletedAt: this.deletedAtVO?._value,
    };
  }
}
