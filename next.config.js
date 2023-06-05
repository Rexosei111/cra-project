// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

// import withPWA from "next-pwa";
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache.js");
const isProduction = process.env.NODE_ENV === "production";

const config = {
  // here goes your Next.js configuration
  reactStrictMode: true,
};

const nextConfig = withPWA({
  dest: "public",
  disable: !isProduction,
  runtimeCaching,
})(config);

// export default nextConfig;
module.exports = nextConfig;
