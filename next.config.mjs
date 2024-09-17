/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		removeConsole: {
			exclude: ['error'],
		},
	},
	images: {
		domains: ['images.ctfassets.net'],
		formats: ['image/avif', 'image/webp'],
	},
}

export default nextConfig
