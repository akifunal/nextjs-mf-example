import { useState } from 'react'
import { type AppProps } from 'next/app'
import Head from 'next/head'
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	type DehydratedState,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '@/styles/globals.css'

type CustomAppProps = {
	dehydratedState: DehydratedState
}

export default function CustomApp({
	Component,
	pageProps,
}: AppProps<CustomAppProps>) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<>
			<Head>
				<title>Template Remote</title>
			</Head>
			<main id='remote'>
				<QueryClientProvider client={queryClient}>
					<HydrationBoundary state={pageProps.dehydratedState}>
						<Component {...pageProps} />
					</HydrationBoundary>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</main>
		</>
	)
}
