const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const API_KEY = '4f2d1527-33ed-4011-8cd6-83e0ccb0caaf';
const BASE_URL = 'https://api.rocketx.exchange/v1';

app.use(bodyParser.json());

// Route to fetch a swap quote
app.get('/quote', async (req, res) => {
  const { fromToken, toToken, fromNetwork, toNetwork, amount } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/quotation`, {
      headers: { 'x-api-key': API_KEY },
      params: { fromToken, toToken, fromNetwork, toNetwork, amount }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.status(500).send('Error fetching quote');
  }
});

// Route to perform a token swap
app.post('/swap', async (req, res) => {
  const { fromTokenId, toTokenId, fromAmount, userAddress, slippage } = req.body;

  try {
    const response = await axios.post(`${BASE_URL}/swap`, {
      fromTokenId, toTokenId, fromAmount, userAddress, slippage
    }, {
      headers: { 'x-api-key': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error performing swap:", error.message);
    res.status(500).send('Error performing swap');
  }
});

// Route to fetch the status of a swap
app.get('/status', async (req, res) => {
  const { txId, requestId } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/status`, {
      headers: { 'x-api-key': API_KEY },
      params: { txId, requestId }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching swap status:", error.message);
    res.status(500).send('Error fetching swap status');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


