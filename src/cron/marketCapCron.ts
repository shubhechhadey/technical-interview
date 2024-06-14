import cron from 'node-cron';
import axios from 'axios';
import  Dataset  from '../models/Dataset'; // Assuming you have a Dataset model
import dotenv from 'dotenv';

dotenv.config();
const COINCAP_API_URL = 'https://api.coincap.io/v2/assets';

const fetchMarketCaps = async () => {
  try {
    const response = await axios.get(COINCAP_API_URL);
    const assets = response.data.data;

    const datasets = await Dataset.findAll();

    for (const dataset of datasets) {
      const asset = assets.find((a: any) => a.symbol === dataset.symbol);
      if (asset) {
        dataset.marketCapUsd = asset.marketCapUsd;
        console.log(`Updated market cap for ${dataset.name} and market cap is ${dataset.marketCapUsd}`)
        await dataset.save();
      }
    }

    console.log('Market caps updated successfully');
  } catch (error) {
    console.error('Error fetching market caps:', error);
  }
};

//Schedule the task to run every day at 8pm UTC
cron.schedule('0 20 * * *', fetchMarketCaps, {
  timezone: 'UTC'
});
