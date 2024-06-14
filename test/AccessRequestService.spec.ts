import AccessRequestService from '../src/services/AccessRequestService';
import AccessRequest from '../src/models/AccessRequest';
import Dataset from '../src/models/Dataset';
import User from '../src/models/User';

jest.mock('../src/models/AccessRequest', () => {
  return {
    create: jest.fn().mockImplementation((data) => {
      return { ...data, id: 'mock-id', requestedAt: new Date() };
    }),
    findAll: jest.fn().mockResolvedValue([]),
    findByPk: jest.fn().mockResolvedValue(null),
  };
});

jest.mock('../src/models/Dataset', () => {
  return {
    findByPk: jest.fn().mockResolvedValue({ id: 'mock-dataset-id' }),
  };
});

jest.mock('../src/models/User', () => {
  return {
    findOne: jest.fn().mockImplementation(() => {
      return { id: 1, name: 'Test User' };
    }),
  };
});

describe('AccessRequestService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('requestAccess', () => {
    test('throws Unauthorized when user is not found', async () => {
      User.findByPk = jest.fn().mockResolvedValue(null);
      await expect(AccessRequestService.requestAccess('test-api-key', 'test-dataset-id', ['daily'])).rejects.toThrow('Unauthorized');
    });

    test('throws Dataset not found when dataset is not found', async () => {
      User.findByPk = jest.fn().mockResolvedValue({ apiKey: 'test-api-key', role: 'Quant' });
      Dataset.findByPk = jest.fn().mockResolvedValue(null);
      await expect(AccessRequestService.requestAccess('test-api-key', 'test-dataset-id', ['daily'])).rejects.toThrow('Dataset not found');
    });

    test('returns access request when user and dataset are found', async () => {
      const mockUser = { apiKey: 'test-api-key', role: 'Quant' };
      const mockDataset = { id: 'test-dataset-id' };
      User.findByPk = jest.fn().mockResolvedValue(mockUser);
      Dataset.findByPk = jest.fn().mockResolvedValue(mockDataset);
      AccessRequest.create = jest.fn().mockResolvedValue({ id: 'unique-id', userId: mockUser.apiKey, datasetId: mockDataset.id, frequencies: ['daily'], status: 'Pending', requestedAt: new Date() });

      const accessRequest = await AccessRequestService.requestAccess(mockUser.apiKey, mockDataset.id, ['daily']);
      expect(accessRequest.userId).toBe(mockUser.apiKey);
      expect(accessRequest.datasetId).toBe(mockDataset.id);
      expect(accessRequest.frequencies).toEqual(['daily']);
    });
  });

  describe('getPendingRequests', () => {
    test('returns all pending access requests', async () => {
      const mockAccessRequests = [{ id: 'test-request-id', status: 'Pending' }];
      AccessRequest.findAll = jest.fn().mockResolvedValue(mockAccessRequests);

      const accessRequests = await AccessRequestService.getPendingRequests();
      expect(accessRequests).toEqual(mockAccessRequests);
    });
  });

  describe('processRequest', () => {
    test('throws Access request not found when access request is not found', async () => {
      AccessRequest.findByPk = jest.fn().mockResolvedValue(null);
      await expect(AccessRequestService.processRequest('test-request-id', 'Approved')).rejects.toThrow('Access request not found');
    });

    test('updates status and processedAt and returns updated access request when access request is found', async () => {
      const mockAccessRequest = { id: 'test-request-id', status: 'Pending', save: jest.fn() };
      AccessRequest.findByPk = jest.fn().mockResolvedValue(mockAccessRequest);

      const accessRequest = await AccessRequestService.processRequest(mockAccessRequest.id, 'Approved');
      expect(accessRequest.status).toBe('Approved');
      expect(accessRequest.processedAt).toBeDefined();
      expect(mockAccessRequest.save).toHaveBeenCalled();
    });
  });
});