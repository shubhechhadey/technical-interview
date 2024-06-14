import { Request, Response } from 'express';
import DatasetController from '../src/controllers/DatasetController';
import DatasetService from '../src/services/DatasetService';

jest.mock('../src/services/DatasetService');

describe('DatasetController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getAllDatasets', () => {
    it('should fetch and send all datasets', async () => {
      const mockDatasets = [{ id: 1 }, { id: 2 }];
      (DatasetService.getAllDatasets as jest.Mock).mockResolvedValue(mockDatasets);

      await DatasetController.getAllDatasets(mockRequest as Request, mockResponse as Response);

      expect(DatasetService.getAllDatasets).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockDatasets);
    });

    it('should handle error and send a response', async () => {
      (DatasetService.getAllDatasets as jest.Mock).mockRejectedValue(new Error('Failed to fetch datasets'));

      await DatasetController.getAllDatasets(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to fetch datasets' });
    });
  });
});