import { useState } from 'react'
import useHello from '@/services'

import { Button } from '@/components/ui/button'
import RemoteComponent from '@/components/RemoteComponent'

const Index = () => {
	const [showRemote, setShowRemote] = useState(false)
	const { data } = useHello()

	const handleShowRemote = () => {
		setShowRemote((prev) => !prev)
	}

	return (
		<div className='container m-4 border-2 border-slate-500 p-5'>
			<h1 className='mb-4 text-3xl'>
				Micro front-end (Module Federation)
			</h1>
			<Button onClick={handleShowRemote}>Toggle remote component</Button>
			<p className='mt-4'>Content:</p>
			<div className='mb-4 border-2 border-red-500 p-5'>
				{showRemote && (
					<RemoteComponent
						url='http://localhost:3334'
						scope='remote'
						module='index'
					/>
				)}
			</div>
		</div>
	)
}

export default Index
