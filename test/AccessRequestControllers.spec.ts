import { Request, Response } from "express";
import AccessRequestController from "../src/controllers/AccessRequestController";
import AccessRequestService from "../src/services/AccessRequestService";

jest.mock("../src/services/AccessRequestService");

describe("AccessRequestController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("requestAccess", () => {
    it("should handle the request and send a response", async () => {
      const mockAccessRequest = { id: 1 };
      (AccessRequestService.requestAccess as jest.Mock).mockResolvedValue(mockAccessRequest);

      mockRequest.body = {
        apiKey: 1,
        datasetId: 1,
        frequencies: ["daily"],
      };

      await AccessRequestController.requestAccess(mockRequest as Request, mockResponse as Response);

      expect(AccessRequestService.requestAccess).toHaveBeenCalledWith(1, 1, ["daily"]);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAccessRequest);
    });

    it("should handle error and send a response", async () => {
      (AccessRequestService.requestAccess as jest.Mock).mockRejectedValue(new Error('Failed to create access request'));

      mockRequest.body = {
        apiKey: 1,
        datasetId: 1,
        frequencies: ["daily"],
      };

      await AccessRequestController.requestAccess(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to create access request' });
    });
  });

  describe("getPendingRequests", () => {
    it("should fetch and send pending requests", async () => {
      const mockPendingRequests = [{ id: 1 }, { id: 2 }];
      (AccessRequestService.getPendingRequests as jest.Mock).mockResolvedValue(mockPendingRequests);

      await AccessRequestController.getPendingRequests(mockRequest as Request, mockResponse as Response);

      expect(AccessRequestService.getPendingRequests).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockPendingRequests);
    });

    it("should handle error and send a response", async () => {
      (AccessRequestService.getPendingRequests as jest.Mock).mockRejectedValue(new Error('Failed to fetch pending requests'));

      await AccessRequestController.getPendingRequests(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to fetch pending requests' });
    });
  });

  describe("processRequest", () => {
    it("should process the request and send a response", async () => {
      const mockProcessedRequest = { id: 1, status: 'processed' };
      (AccessRequestService.processRequest as jest.Mock).mockResolvedValue(mockProcessedRequest);

      mockRequest.body = {
        requestId: 1,
        status: 'processed',
      };

      await AccessRequestController.processRequest(mockRequest as Request, mockResponse as Response);

      expect(AccessRequestService.processRequest).toHaveBeenCalledWith(1, 'processed');
      expect(mockResponse.json).toHaveBeenCalledWith(mockProcessedRequest);
    });

    it("should handle error and send a response", async () => {
      (AccessRequestService.processRequest as jest.Mock).mockRejectedValue(new Error('Failed to process request'));

      mockRequest.body = {
        requestId: 1,
        status: 'processed',
      };

      await AccessRequestController.processRequest(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to process request' });
    });
  });
});