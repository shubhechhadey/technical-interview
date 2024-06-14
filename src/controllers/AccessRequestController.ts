import { Request, Response } from 'express';
import AccessRequestService from '../services/AccessRequestService';

class AccessRequestController {
  public async requestAccess(req: Request, res: Response): Promise<void> {
    const { apiKey, datasetId, frequencies } = req.body;
    try {
      const accessRequest = await AccessRequestService.requestAccess(apiKey, datasetId, frequencies);
      res.json(accessRequest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create access request' });
    }
  }

  public async getPendingRequests(req: Request, res: Response): Promise<void> {
    try {
      const pendingRequests = await AccessRequestService.getPendingRequests();
      res.json(pendingRequests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pending requests' });
    }
  }

  public async processRequest(req: Request, res: Response): Promise<void> {
    const { requestId, status  } = req.body;
    try {
      const accessRequest = await AccessRequestService.processRequest(requestId, status);
      res.json(accessRequest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process request' });
    }
  }
}

export default new AccessRequestController();
