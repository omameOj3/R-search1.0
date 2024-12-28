import React from 'react';

interface SearchResultProps {
  result: number | null;
  error: string;
}

export function SearchResult({ result, error }: SearchResultProps) {
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600 whitespace-pre-line">{error}</p>
      </div>
    );
  }

  if (result === null) {
    return null;
  }

  return (
    <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-md">
      <h2 className="text-xl font-semibold text-green-900">検索結果</h2>
      <p className="mt-2 text-green-800">
        検索順位: <span className="font-bold text-2xl">{result}</span> 位
      </p>
    </div>
  );
}