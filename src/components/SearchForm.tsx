import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  productUrl: string;
  keyword: string;
  loading: boolean;
  onProductUrlChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchForm({
  productUrl,
  keyword,
  loading,
  onProductUrlChange,
  onKeywordChange,
  onSubmit,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="productUrl" className="block text-sm font-medium text-gray-700 mb-1">
          商品URL
        </label>
        <input
          id="productUrl"
          type="url"
          value={productUrl}
          onChange={(e) => onProductUrlChange(e.target.value)}
          placeholder="https://item.rakuten.co.jp/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
          検索キーワード
        </label>
        <input
          id="keyword"
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="例: ペット ブランケット"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        {loading ? '検索中...' : '順位を確認する'}
      </button>
    </form>
  );
}