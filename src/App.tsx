import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { SearchResult } from './components/SearchResult';
import { checkRankPosition } from './utils/rankChecker';

function App() {
  const [productUrl, setProductUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const rank = await checkRankPosition(productUrl, keyword);
      setResult(rank);
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Search className="w-6 h-6" />
            楽天市場 商品順位チェッカー
          </h1>

          <SearchForm
            productUrl={productUrl}
            keyword={keyword}
            loading={loading}
            onProductUrlChange={setProductUrl}
            onKeywordChange={setKeyword}
            onSubmit={handleSubmit}
          />

          <SearchResult result={result} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;