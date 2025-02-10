import {render, screen} from '@testing-library/react'

import { PostBody } from './post-body';
import { describe, it } from 'node:test'

describe('Post body component', () => {
	it('Post body renders', () => {
		render(<PostBody  />)

		expect(screen.getByRole('heading')).toBeNull()
	})
})


