export interface RakutenSearchResponse {
  Items: Array<{
    Item: {
      itemCode: string;
      itemName: string;
      itemUrl: string;
      shopName: string;
      rank: number;
    };
  }>;
  pageCount: number;
  hits: number;
  last: number;
  count: number;
  page: number;
  carrier: number;
  GenreInformation: Array<unknown>;
  TagInformation: Array<unknown>;
}