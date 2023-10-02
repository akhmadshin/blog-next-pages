import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useUrl = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useMemo(() => {
    return `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;
  }, [pathname, searchParams])

}