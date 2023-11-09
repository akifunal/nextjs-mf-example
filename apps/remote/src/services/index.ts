import { useQuery } from '@tanstack/react-query'

export const getHello = async () => {
	try {
		const response = await fetch('http://localhost:3000/api/hello')
		const data = await response.json()
		console.log('Remote: ', data)

		return data
	} catch (error) {
		console.log(error)
	}
}

function useHello() {
	return useQuery({
		queryFn: getHello,
		queryKey: ['Hello-remote'],
	})
}

export default useHello
