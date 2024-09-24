import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	plugins: [require('daisyui')],
	theme: {
		extend: {
			gridTemplateRows: {
				custom: '30px minmax(auto, 1fr) 35px',
			},
		},
	},
}
export default config
