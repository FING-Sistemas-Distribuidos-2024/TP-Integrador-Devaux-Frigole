/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL,
    },
  };
  
  console.log("BACKEND_URL during build:", process.env.BACKEND_URL);
  
  export default nextConfig;
  