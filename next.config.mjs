/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com','res.cloudinary.com', 'images.pexels.com'],
        formats: ['image/webp', 'image/avif'],
    },
    output:'standalone',
    experimental: {
        optimizeCss: true,
    },
};

export default nextConfig;
