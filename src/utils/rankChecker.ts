import { searchProducts } from './rakutenApi';

export async function checkRankPosition(productUrl: string, keyword: string): Promise<number> {
  const MAX_PAGES = 10;
  const { itemCode, shopCode } = extractProductInfo(productUrl);
  
  if (!itemCode || !shopCode) {
    throw new Error('無効な商品URLです。楽天市場の商品URLを入力してください。');
  }

  console.log('Searching with:', { itemCode, shopCode, keyword });

  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const response = await searchProducts({
        keyword,
        page,
        itemCode,
        shopCode
      });
      
      if (!response.Items || response.Items.length === 0) {
        console.log('No items found on page', page);
        continue;
      }

      const foundItem = response.Items.find(
        ({ Item }) => Item.itemCode === itemCode
      );

      if (foundItem) {
        console.log('Found item:', foundItem);
        return (page - 1) * 30 + foundItem.Item.rank;
      }

      if (page >= response.pageCount) {
        console.log('Reached last page:', page);
        break;
      }
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  throw new Error('商品が見つかりませんでした（上位300件以内）');
}

interface ProductInfo {
  itemCode: string | null;
  shopCode: string | null;
}

function extractProductInfo(url: string): ProductInfo {
  try {
    const itemUrl = new URL(url);
    
    if (!itemUrl.hostname.endsWith('rakuten.co.jp')) {
      return { itemCode: null, shopCode: null };
    }
    
    const pathParts = itemUrl.pathname.split('/').filter(part => part.length > 0);
    
    if (pathParts.length < 2) {
      return { itemCode: null, shopCode: null };
    }

    // 拡張子（.html等）を除去
    const itemCode = pathParts[pathParts.length - 1].replace(/\.[^/.]+$/, '');
    const shopCode = pathParts[pathParts.length - 2];

    console.log('Extracted product info:', { itemCode, shopCode });
    return { itemCode, shopCode };
  } catch (error) {
    console.error('URL parsing error:', error);
    return { itemCode: null, shopCode: null };
  }
}