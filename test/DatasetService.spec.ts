import DatasetService from '../src/services/DatasetService';
import Dataset from '../src/models/Dataset';

jest.mock('../src/models/Dataset');

describe('DatasetService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('getAllDatasets', async () => {
    const mockDatasets = [
      { name: 'Dataset 1', symbol: 'D1', frequencies: ['daily'] },
      { name: 'Dataset 2', symbol: 'D2', frequencies: ['weekly'] },
    ];
    Dataset.findAll = jest.fn().mockResolvedValue(mockDatasets);

    const datasets = await DatasetService.getAllDatasets();
    expect(datasets).toEqual(mockDatasets);
  });
});