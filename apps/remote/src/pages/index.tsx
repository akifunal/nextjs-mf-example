import useHello from '@/services'

import { Button } from '@/components/ui/button'

import 'tailwindcss/utilities.css'

function Home() {
	const { data } = useHello()

	const handleClick = () => {
		alert('Remote Button clicked!')
	}

	return (
		<div className='p-3'>
			<Button onClick={handleClick}>Remote button</Button>
		</div>
	)
}

export default Home
