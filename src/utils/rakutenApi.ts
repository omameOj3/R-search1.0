import { RAKUTEN_API_CONFIG } from '../config/api';
import type { RakutenSearchResponse } from '../types/rakuten';

interface SearchParams {
  keyword: string;
  page?: number;
  itemCode?: string;
  shopCode?: string;
}

export async function searchProducts({
  keyword,
  page = 1,
  itemCode,
  shopCode
}: SearchParams): Promise<RakutenSearchResponse> {
  const params = new URLSearchParams({
    applicationId: RAKUTEN_API_CONFIG.APP_ID,
    affiliateId: RAKUTEN_API_CONFIG.AFFILIATE_ID,
    format: 'json',
    keyword,
    page: page.toString(),
    hits: '30'
  });

  if (itemCode) params.append('itemCode', itemCode);
  if (shopCode) params.append('shopCode', shopCode);

  const url = `${RAKUTEN_API_CONFIG.BASE_URL}?${params}`;
  console.log('Requesting URL:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(`楽天APIエラー: ${data.error_description || '不明なエラー'}`);
    }

    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw new Error('楽天APIからのデータ取得に失敗しました。ネットワーク接続を確認してください。');
  }
}