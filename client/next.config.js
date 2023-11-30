/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    const catalogURL = process.env.catalogURL || "http://catalog:8003";
    const authURL = process.env.authURL || "http://auth:8002";
    const ordersURL = process.env.ordersURL || "http://orders:8006";
    const shoppingURL = process.env.shoppingURL || "http://shopping:8004";
    const analyticsURL = process.env.analyticsURL || "http://analytics:8005";

    return [
      {
        source: "/api/catalog/:route*",
        destination: `${catalogURL}/:route*`,
      },
      {
        source: "/api/auth/:route*",
        destination: `${authURL}/:route*`,
      },
      {
        source: "/api/orders/:route*",
        destination: `${ordersURL}/:route*`,
      },
      {
        source: "/api/shoppingCart/:route*",
        destination: `${shoppingURL}/:route*`,
      },
      {
        source: "/api/analytics/:route*",
        destination: `${analyticsURL}/:route*`,
      },
    ];
  },
};
