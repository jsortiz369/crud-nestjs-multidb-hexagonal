import { UserNotFoundException } from '../exceptions';
import { UserRepository } from '../repository';
import { User } from '../user';
import { UserId } from '../vo';

export class UserFindOneByIdService {
  /**
   * Creates an instance of UserFindOneByIdService.
   * @date 2025-12-05 22:41:33
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserRepository} userRepository
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @description Validate exist user by ID
   * @date 2025-12-05 22:41:37
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {string} id
   * @returns {Promise<User>}
   */
  async execute(id: string): Promise<User> {
    // TODO: value object ID
    const _id = new UserId(id);
    const user = await this.userRepository.findOneById(_id);

    // TODO: throw exception if not found
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
