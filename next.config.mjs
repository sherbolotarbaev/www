/** @type {import('next').NextConfig} */
const nextConfig = {
	// compiler: {
	// 	removeConsole: {
	// 		exclude: ['error'],
	// 	},
	// },
	transpilePackages: ['next-mdx-remote'],
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['www.sherbolotarbaev.co'],
	},
}

export default nextConfig
