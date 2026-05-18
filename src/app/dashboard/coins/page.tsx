"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';

export default function CoinsDashboard() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch('/api/v1/indices/halal', {
          headers: { 'Authorization': 'Bearer sk_live_halal_8f92a4c10eb3d45f' }
        });
        const data = await res.json();
        if (data.success) {
          setCoins(data.data.assets);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(c => filter === 'all' ? true : c.sharia_analysis.status === filter);

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '6px' }}>HALAL INDEX — TOP 50</div>
            <div style={{ height: '1.5px', width: '40px', backgroundColor: '#4a6fa5' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'halal', 'doubtful', 'haram'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: filter === f ? 500 : 400,
                  background: filter === f ? '#4a6fa5' : '#ffffff',
                  color: filter === f ? '#ffffff' : '#9a9aaa',
                  border: filter === f ? '1px solid #4a6fa5' : '1px solid #e0e0e8',
                  borderRadius: '20px', padding: '4px 14px', textTransform: 'capitalize', cursor: 'pointer'
                }}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#1a1a2e', fontFamily: 'var(--font-body)' }}>Loading index data...</div>
        ) : (
          <div style={{ width: '100%', background: '#ffffff', borderRadius: '12px', padding: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <tbody>
                {filteredCoins.map((coin: any) => (
                  <tr key={coin.symbol} style={{ borderBottom: '0.5px solid #f0f0f0' }}>
                    <td style={{ padding: '14px 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={coin.image} alt={coin.name} width={28} height={28} style={{ borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', color: '#1a1a2e' }}>{coin.name}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '11px', color: '#9a9aaa' }}>{coin.symbol.toUpperCase()}</div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 0', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', color: '#1a1a2e' }}>
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 0' }}>
                      <span className={`badge badge-${coin.sharia_analysis.status}`}>
                        {coin.sharia_analysis.status === 'halal' ? '✓ Halal' : coin.sharia_analysis.status === 'haram' ? '✗ Haram' : '⚠ Doubtful'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 0', textAlign: 'right' }}>
                      <Link href={`/dashboard/coins/${coin.symbol}`} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9a9aaa', textDecoration: 'underline' }}>
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
