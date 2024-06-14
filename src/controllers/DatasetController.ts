import { Request, Response } from 'express';
import DatasetService from '../services/DatasetService';

class DatasetController {
  public async getAllDatasets(req: Request, res: Response): Promise<void> {
    try {
      const datasets = await DatasetService.getAllDatasets();
      res.json(datasets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch datasets' });
    }
  }
}

export default new DatasetController();
