import { memo } from 'react'
import dynamic from 'next/dynamic'
import { importRemote } from '@module-federation/utilities'
import { ErrorBoundary } from 'react-error-boundary'

type RemoteComponentProps = {
	url: string
	scope: string
	module: string
	fallback?: JSX.Element | null
}

const getFormattedUrl = (url: string) => {
	const isServer = typeof window === 'undefined'
	const location = isServer ? 'ssr' : 'chunks'

	return `${url}/_next/static/${location}`
}

const RemoteComponent = (props: RemoteComponentProps) => {
	const {
		url,
		scope = 'default',
		module,
		fallback = <p>Loading...</p>,
	} = props

	const Component = dynamic<RemoteComponentProps>(
		() =>
			importRemote({
				url: getFormattedUrl(url),
				scope,
				module,
			}),
		{
			loading: () => fallback,
			//! Ssr getting error for window is not defined
			ssr: false,
		},
	)

	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Component {...props} />
		</ErrorBoundary>
	)
}

export default memo(RemoteComponent)
