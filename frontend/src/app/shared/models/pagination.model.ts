export class IPaginationResult {
  docs: any[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

// tslint:disable-next-line:max-classes-per-file
export class IPaginationInput {
  limit = 10;
  page = 1;
}

export interface IPaginationInputV2 {
  [key: string]: string | number;
}

export interface IBulkActionOption {
  id: string;
  name: string;
  // tslint:disable-next-line:ban-types
  isDisabled?: Function;
  icon?: string;
}
