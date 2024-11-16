/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com','res.cloudinary.com']
    },
    output:'standalone',
    redirects: async () => [
        {
          source: '/api/auth',
          destination: '/api/auth/[...nextauth]',
          permanent: false, // For dynamic routes, provide fallback support
        },
      ],
      reactStrictMode: true,
    
};

export default nextConfig;
