import { User } from '../user';
import { UserEmail, UserId } from '../vo';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
  abstract findOneById(id: UserId): Promise<User | null>;
  abstract existByEmail(email: UserEmail, id?: UserId): Promise<boolean>;
  abstract update(id: UserId, data: any): Promise<User>;
  abstract delete(id: UserId): Promise<User>;
}
