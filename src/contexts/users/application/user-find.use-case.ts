import { PageNotFoundException } from 'src/shared/system/domain/exceptions';
import { UserFind } from '../domain/user.interface';
import { UserRepository } from '../domain/user.repository';

export class UserFindUseCase {
  /**
   * Creates an instance of UserFindUseCase.
   * @date 2025-11-19 18:31:33
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserRepository} _userRepository
   */
  constructor(private readonly _userRepository: UserRepository) {}

  async run(userFind: UserFind) {
    const { data, meta } = await this._userRepository.find(userFind);
    if (userFind.page != 1 && meta.lastPage < meta.page) throw new PageNotFoundException();
    return { meta, data: data.map((_) => _.toPrimitives()) };
  }
}
