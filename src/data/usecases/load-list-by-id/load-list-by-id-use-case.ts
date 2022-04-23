import { ILoadListByIdRepository } from '@/data/interfaces/db/load-list-by-id-repository'
import { IList } from '@/domain/models/list'
import { ILoadListById } from '@/domain/usecases/load-list-by-id-usecase'

export class LoadListByIdUseCase implements ILoadListById {
  constructor(
    private readonly loadListByIdRepository: ILoadListByIdRepository
  ) {}

  async load(id: string): Promise<IList> {
    const list = await this.loadListByIdRepository.loadById(id)
    return list
  }
}
