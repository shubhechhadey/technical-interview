import { Router } from 'express';
import DatasetController from '../controllers/DatasetController';
import AccessRequestController from '../controllers/AccessRequestController';

const router = Router();

// Dataset routes
router.get('/datasets', DatasetController.getAllDatasets);

// Access request routes
router.post('/request-access', AccessRequestController.requestAccess);
router.get('/access-requests', AccessRequestController.getPendingRequests);
router.post('/process-request', AccessRequestController.processRequest);

export default router;
