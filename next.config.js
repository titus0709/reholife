// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   images: {
//     domains: ["images.unsplash.com", "reholife.local"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "reholife-new.local",
//         pathname: "/wp-content/uploads/**",
//       },
     
//       // add other hosts or CDNs used by WP uploads
//     ],
//   },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'reholife-new.local', // Your actual domain
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig