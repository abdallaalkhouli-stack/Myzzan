import { NextResponse } from 'next/server';
import { analyzeCoin } from '../../../../../services/shariaEngine';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  // Basic mock API key validation
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: "Unauthorized. Missing or invalid API key." },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  
  if (token.length < 10) {
    return NextResponse.json(
      { error: "Invalid API key format." },
      { status: 401 }
    );
  }

  try {
    // STEP 1: Fetch Top 50 Coins from CoinGecko
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false',
      {
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store' 
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const coinsData = await response.json();

    // Map to the required display fields and apply AI Sharia Engine
    const assets = coinsData.map((coin: any) => {
      const verdict = analyzeCoin(coin.name, coin.symbol);
      
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        image: coin.image,
        last_updated: coin.last_updated,
        sharia_analysis: verdict
      };
    });

    // Record mock usage here (simulated)
    console.log(`API usage tracked for key ending in ...${token.slice(-4)}`);

    return NextResponse.json({
      success: true,
      data: {
        index_name: "Top 50 Crypto Assets (Pre-AI Sharia Analysis)",
        count: assets.length,
        assets: assets,
        total_market_cap: assets.reduce((acc: number, curr: any) => acc + curr.market_cap, 0)
      }
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch crypto index data. " + error.message },
      { status: 500 }
    );
  }
}
