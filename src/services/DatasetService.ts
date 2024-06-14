import Dataset from '../models/Dataset';

class DatasetService {
  public async getAllDatasets(): Promise<Dataset[]> {
    return Dataset.findAll({ attributes: ['name', 'symbol', 'frequencies'] });
  }
}

export default new DatasetService();
