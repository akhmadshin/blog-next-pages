import NextLink, { LinkProps } from 'next/link';
import React, { KeyboardEvent, MouseEvent } from 'react';

import { usePlaceholderStore } from '@/store/usePlaceholderStore';
import { onActionKeyPress } from '@/lib/navigation-utils';
import { useUrl } from '@/hooks/useUrl';
import { transitionHelper } from '@/lib/transition-utils';
type LinkPropsReal = React.PropsWithChildren<
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
	LinkProps
	>

export type LinkPropsModified = LinkPropsReal & {
	data?: any;
	beforeTransition?: () => void;
	afterTransition?: () => void;
}

type Props = LinkPropsReal & {
	data?: any;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkPropsModified>(function LinkComponent(props, forwardedRef) {
	const {
		data,
		onClick,
		onKeyPress,
		href,
		children,
		beforeTransition,
		afterTransition,
		...restProps
	} = props;
	const currentUrl = useUrl();

	const setPlaceholder = usePlaceholderStore(state => state.setPlaceholder);

	const isAbsoluteUrlOrAnchorUrl = typeof href === 'string' && (/^http/.test(href) || /^#/.test(href));
	const isSameUrl = currentUrl === href;


	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if (beforeTransition && !isSameUrl) {
			beforeTransition()
		}
		if (onClick) {
			onClick(e);
		}
		if (isAbsoluteUrlOrAnchorUrl || e.metaKey) {
			return;
		}
		handleLocalRouteNavigation(data);
	}

	const handleKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
		if (onKeyPress) {
			onKeyPress(e);
		}
		if (isAbsoluteUrlOrAnchorUrl || e.metaKey) {
			return;
		}
		handleLocalRouteNavigation(data);
	}

	const handleLocalRouteNavigation = (data: any) => {
		if (data) {
			setPlaceholder(data);
		}
		startPageTransition();
	}

	const startPageTransition = () => {
		if (isSameUrl) {
			return;
		}
		const pageMountedPromise = new Promise(resolve => {
			window.pageMounted = resolve as any;
		});

		transitionHelper(async () => {
			if (afterTransition) {
				afterTransition();
			}
			await pageMountedPromise;
		});
	}

	return (
		<NextLink
			onClick={handleClick}
			prefetch={false}
			onKeyPress={onActionKeyPress<HTMLAnchorElement>((e) => handleKeyPress(e))}
			href={href}
			ref={forwardedRef}
			{...restProps}
		>{children}</NextLink>
	)
})