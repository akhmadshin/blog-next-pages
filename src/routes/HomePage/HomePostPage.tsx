import React from 'react';

import { ArticleCard } from '@/components/ArticleCard';
import { usePageData } from '@/hooks/usePageData';
import { SkeletonHomePostPage } from '@/routes/HomePage/SkeletonHomePostPage';
import { HomePageProps } from '@/pages';

export const HomePostPage = () => {
  const { data: articles, isLoading, isFetching} = usePageData<HomePageProps>();

  if (!articles && (isLoading || isFetching)) {
    return (
      <SkeletonHomePostPage />
    );
  }

  if (!articles || !articles?.data) {
    return;
  }

  return (
    <div className="mt-16">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
        {articles.data.map((article, index) => (
          <ArticleCard article={article} priority={index === 0} key={index}/>
        ))}
      </div>
    </div>
  );
}
