/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "convoconnect-backend.onrender.com",
      },
    ],
  },
};

export default nextConfig;
