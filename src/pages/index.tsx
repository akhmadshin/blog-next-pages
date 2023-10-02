import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { Meta } from '@/components/Meta';
import { Container } from '@/components/Container';
import React from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { fetchArticles } from '@/requests/articleRequests';

const getQueryOptions = () => ({
  queryKey: ['/'],
  queryFn: async () => fetchArticles(),
});

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getQueryOptions());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Page() {
  const {data: articles} = useQuery<unknown, unknown, any[]>({
    ...getQueryOptions(),
    placeholderData: [undefined, undefined]
  });

  if (!articles) {
    return;
  }

  return (
    <Container className="mt-16 sm:mt-32">
      <Meta
        title="Home page"
        description="Home description"
      />
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Aliquam aliquet ipsum eget velit rutrum sagittis. Ut tempus libero sem, at fringilla massa varius quis.
        </h1>
        <p className="mt-10 prose lg:prose-xl max-w-none dark:prose-invert">
          Ut tincidunt tristique auctor. Sed aliquam massa id felis lobortis dictum.
          Sed cursus risus sit amet eros finibus scelerisque. Praesent non dignissim neque.
          Etiam ultricies libero sodales elit dictum venenatis.
          Integer condimentum lorem in ligula condimentum, vitae suscipit ligula pulvinar.
          Quisque iaculis vel justo at tristique. Duis a urna interdum, iaculis orci quis,
          dignissim dui. Nullam nec volutpat velit.
        </p>
      </div>
      <div className="mt-16 sm:mt-32">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <ArticleCard article={article} key={index}/>
          ))}
        </div>
      </div>
    </Container>
  )
}
