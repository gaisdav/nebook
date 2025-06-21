export type TGoogleBookSearchParams = {
    query: string;
    page?: number;
    limit?: number;
  };
  
  export type TChangeStatus = {
    userId: string;
    bookId: string;
    status: number;
  };
  
  export type TUserIdBookId = {
    userId: string;
    bookId: string;
  };
  
  export type TUserIdStatuses = {
    userId: string;
    statuses: number[];
  };
  
  export type TUserIdBookIdStatuses = {
    userId: number;
    bookId: string;
    statuses: number[];
  };