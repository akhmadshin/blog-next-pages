import { Component } from '@/types/general';
import { SkeletonText } from '@/components/skeletons/SkeletonText';

export const SkeletonArticleCard: Component = () => {
  return (
    <article className="flex flex-col items-start justify-between card pointer-events-none">
      <div className="relative w-full">
        <div
          className="aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] w-full rounded-2xl bg-gray-100 dark:bg-zinc-400 object-cover pointer-events-none"></div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
      </div>
      <div className=" w-full">
        <div className="mt-3 text-lg font-semibold tracking-tight leading-6">
          <SkeletonText width="45%"/>
        </div>

        <div className="relative z-10 mt-5 line-clamp-3 text-sm leading-6 ">
          <SkeletonText className="mt-1px bg-zinc-600 dark:bg-zinc-400" width="90%"/>
          <SkeletonText className="mt-1px bg-zinc-600 dark:bg-zinc-400" width="60%"/>
        </div>
      </div>
    </article>
  )
}