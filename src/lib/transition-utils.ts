export function transitionHelper(updateDOM: () => Promise<void>) {
	// @ts-ignore
	if (!document.startViewTransition) {
		const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {});

		return {
			ready: Promise.reject(Error('View transitions unsupported')),
			updateCallbackDone,
			finished: updateCallbackDone,
			skipTransition: () => {},
		};
	}

	// @ts-ignore
	return document.startViewTransition(updateDOM);
}