import AccessRequest from '../models/AccessRequest';
import Dataset from '../models/Dataset';
import User from '../models/User';

class AccessRequestService {
  public async requestAccess(apiKey: string, datasetId: string, frequencies: string[]): Promise<AccessRequest> {
    const user = await User.findByPk(apiKey);
    if (!user || user.role !== 'Quant') {
      throw new Error('Unauthorized');
    }
    const dataset = await Dataset.findByPk(datasetId);
    if (!dataset) {
      throw new Error('Dataset not found');
    }
    return AccessRequest.create({
      id: 'unique-id', // Generate a unique ID
      userId: user.apiKey,
      datasetId: dataset.id,
      frequencies,
      status: 'Pending',
      requestedAt: new Date(),
    });
  }

  public async getPendingRequests(): Promise<AccessRequest[]> {
    return AccessRequest.findAll({ where: { status: 'Pending' } });
  }

  public async processRequest(requestId: string, status: string): Promise<AccessRequest> {
    const accessRequest = await AccessRequest.findByPk(requestId);
    if (!accessRequest) {
      throw new Error('Access request not found');
    }
    accessRequest.status = status;
    accessRequest.processedAt = new Date();
    await accessRequest.save();
    return accessRequest;
  }
}

export default new AccessRequestService();
