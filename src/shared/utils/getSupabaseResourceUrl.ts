import qs from 'qs';

export function getSupabaseResourceUrl(
  bucketName: 'assets',
  path: string,
  options?: {
    queryParams?: Record<string, string>;
  },
) {
  let url = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${bucketName}/${path}`;

  if (options?.queryParams) {
    const encodedQuery = qs.stringify(options.queryParams, {
      addQueryPrefix: true,
    });
    url += encodedQuery;
  }

  return url;
}
