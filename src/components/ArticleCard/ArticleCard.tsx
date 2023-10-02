import Image from 'next/image';
import React, { useRef } from 'react';

import { Link } from '@/components/Link';
import { SkeletonArticleCard } from '@/components/ArticleCard/SkeletonArticleCard';


export const ArticleCard: React.FC<any> = (props) => {
	const imageRef = useRef<HTMLImageElement>(null);

	if (!props.article) {
		return <SkeletonArticleCard />
	}

	const articleAttributes = props.article;
	const coverAttributes = articleAttributes.cover.data?.attributes;

	const handleBeforeTransition = () => {
		if (imageRef.current) {
			// @ts-ignore
			imageRef.current.style.viewTransitionName = 'banner-img'
		}
	};
	const handleAfterTransition = () => {
		if (imageRef.current) {
			// @ts-ignore
			imageRef.current.style.viewTransitionName = '';
		}
	}

	return (
		<article className="flex flex-col items-start justify-between card pointer-events-none">
			<div className="relative w-full">
				<Image
					alt=""
					className=" w-full rounded-2xl bg-gray-100 object-cover"
					src={coverAttributes.url}
					ref={imageRef}
					width={coverAttributes.width}
					height={coverAttributes.height}
				/>
				<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
			</div>
			<div className=" w-full">
				<h3
					className="mt-3 text-regular-14 line-clamp-3 4xl:text-regular-18 group-hover:text-gray-600"
				>
					<Link
						beforeTransition={handleBeforeTransition}
						afterTransition={handleAfterTransition}
						href={`/blog/${articleAttributes.slug}/`}
						data={props.article}
						className={'pointer-events-auto card-link'}
					>
						{articleAttributes.title}
					</Link>
				</h3>
				<p className="relative z-10 mt-5 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
					{articleAttributes.description}
				</p>
			</div>
		</article>
	)
}