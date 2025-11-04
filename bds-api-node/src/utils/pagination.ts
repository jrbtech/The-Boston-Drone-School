export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationResult = {
  page: number;
  limit: number;
  offset: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const resolvePagination = ({ page = 1, limit = 25 }: PaginationParams = {}): PaginationResult => {
  const safePage = Number.isNaN(page) || page < 1 ? 1 : Math.floor(page);
  const safeLimit = Number.isNaN(limit) || limit < 1 ? 25 : Math.min(Math.floor(limit), 100);

  return {
    page: safePage,
    limit: safeLimit,
    offset: (safePage - 1) * safeLimit,
  };
};

export const buildPaginatedResponse = <T>(
  data: T[],
  total: number,
  { page, limit }: PaginationResult
): PaginatedResponse<T> => ({
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  },
});
