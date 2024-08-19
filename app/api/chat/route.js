import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANIZATION_ID,
});

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_API_URL = "https://www.alphavantage.co/query";

async function fetchStockData(stockSymbol) {
  try {
    const response = await axios.get(ALPHA_VANTAGE_API_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: stockSymbol,
        interval: '5min',
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });
    const data = response.data;
    if (data["Time Series (5min)"]) {
      const latestTime = Object.keys(data["Time Series (5min)"])[0];
      const latestData = data["Time Series (5min)"][latestTime];
      return {
        price: latestData["1. open"],
        time: latestTime
      };
    } else {
      throw new Error('Invalid stock symbol or API limit reached');
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
}

async function getOpenAIResponse(prompt, model) {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    throw new Error("Failed to fetch response from OpenAI.");
  }
}

export async function POST(req) {
  const { prompt, context } = await req.json();
  let finalPrompt = context ? `${context}\n\nUser: ${prompt}` : `User: ${prompt}`;
  
  const lowerCasePrompt = prompt.toLowerCase();

  if (lowerCasePrompt === "who made this app?" || lowerCasePrompt === "who made this webapp?" || lowerCasePrompt === "who built this app?" || lowerCasePrompt === "who developed this app?") {
    const hardcodedResponse = "The creators of this web app are Alonso Peralta and Stephen Monahan; their websites are 'alonsoperalta.com' and 'stephenswe.com'.";
    return NextResponse.json({ botMessage: hardcodedResponse });
  }

  if (lowerCasePrompt === "what can you do?") {
    const hardcodedResponse = "I can give financial advice and also provide company data depending on the ticker symbol.";
    return NextResponse.json({ botMessage: hardcodedResponse });
  }

  if (lowerCasePrompt === "what is your name?" || lowerCasePrompt === "who are you?") {
    const hardcodedResponse = "I am Robinhood's AI assistant (mock). I can help you with financial advice.";
    return NextResponse.json({ botMessage: hardcodedResponse });
  }

  let model = "ft:gpt-4o-mini-2024-07-18:aperalta03:finance-advisor:9uMknHpy";

  if (lowerCasePrompt.startsWith("advice - ")) {
    model = "ft:gpt-4o-mini-2024-07-18:aperalta03:situations-advisor:9uPXdfge";
    finalPrompt = finalPrompt.replace(/advice - /i, '');
  }

  try {
    let botMessage;

    if (lowerCasePrompt.startsWith("market - ")) {
      const queryWithoutPrefix = prompt.replace(/market - /i, '').trim();
      const stockSymbol = queryWithoutPrefix.split(" ").pop().toUpperCase();
      const stockData = await fetchStockData(stockSymbol);
      
      if (stockData) {
        const openaiPrompt = `The current stock price for ${stockSymbol} is $${stockData.price} as of ${stockData.time}. Can you provide more details about ${stockSymbol}?`;
        botMessage = await getOpenAIResponse(openaiPrompt, model);
      } else {
        throw new Error("Failed to fetch stock data.");
      }    
    } else {
      botMessage = await getOpenAIResponse(finalPrompt, model);
    }

    return NextResponse.json({ botMessage });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
