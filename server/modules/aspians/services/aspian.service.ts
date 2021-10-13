import { AspianEntity } from '../entities/aspian.entity';
import { aspianDbService } from './aspiandb.service';

class AspianService {
  getAllAspians = async () => {
    return await aspianDbService.getAll();
  };

  addAspian = async (aspian: AspianEntity) => {
    const instertedAspian = await aspianDbService.addAspian(aspian);
    return await this.getAspian(instertedAspian.insertedId.toHexString());
  };

  getAspian = async (aspianId: string) => {
    return await aspianDbService.getAspian(aspianId);
  };
}

export const aspianService = new AspianService();
