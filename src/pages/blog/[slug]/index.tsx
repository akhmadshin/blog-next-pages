import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { usePlaceholderStore } from '../../../store/usePlaceholderStore';
import { Container } from '../../../components/Container';
import { Meta } from '../../../components/Meta';
import { useRouter } from 'next/router';
import SkeletonRichText from '../../../components/skeletons/SkeletonRichText';
import { fetchArticle } from '@/requests/articleRequests';

const getQueryOptions = (slug: string) => {
  return {
    queryKey: ['blog', slug],
    queryFn: async () => fetchArticle(slug),
  }
}

export const getServerSideProps: GetServerSideProps<{ dehydratedState: any }> = async ({params}) => {
  const {slug} = params as { slug: string };
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(getQueryOptions(slug))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Page() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const placeholderData = usePlaceholderStore(state => state.placeholder);
  const queryOptions = getQueryOptions(slug);

  const {data, isLoading} = useQuery({
    ...queryOptions,
    placeholderData,
  });

  if (!data) {
    return <></>;
  }

  const {title, description, cover, content} = data || {};
  const {height, width, url} = cover?.data?.attributes as any || {};

  return (
    <Container className="flex flex-col mt-16 sm:mt-32">
      <Meta
        title={title}
        description={description}
      />
      <article className="flex flex-col space-y-8 dark:text-gray-50">
        <div className="flex flex-col  space-y-6">
          <div className="flex flex-col ">
            <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
          </div>
          <div className="relative w-full banner-img">
            <Image
              alt=""
              className=" w-full rounded-2xl bg-gray-100 object-cover"
              src={url}
              width={Number(width)}
              height={Number(height)}
            />
          </div>
        </div>
        <div className="dark:text-gray-100">
          <p>{description}</p>
          {isLoading ? (
            <SkeletonRichText/>
          ) : (
            <div className="mt-10">
              <div className="prose lg:prose-xl max-w-none dark:prose-invert">
                <div className="" dangerouslySetInnerHTML={{__html: content}}/>
              </div>
            </div>
          )}
        </div>
      </article>
    </Container>
  );
}
