/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Old waitlist URLs may still be shared around — send them somewhere useful.
    return [
      { source: "/register", destination: "/demo", permanent: true },
      { source: "/welcome", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
