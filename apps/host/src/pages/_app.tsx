import { useState } from 'react'
import { type AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	type DehydratedState,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '@/styles/globals.css'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

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
			<style
				dangerouslySetInnerHTML={{
					__html: `
					:root {
						--font-inter: ${inter.style.fontFamily};
					}`,
				}}
			/>
			<Head>
				<title>Template Host</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</HydrationBoundary>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	)
}
