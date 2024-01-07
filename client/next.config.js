/** @type {import('next').NextConfig} */
const withImages = require("next-images");
module.exports = {
  async rewrites() {
    const catalogURL = process.env.CATALOG_URL || "http://localhost:8003";
    const authURL = process.env.AUTH_URL || "http://localhost:8002";
    const ordersURL = process.env.ORDERS_URL || "http://localhost:8006";
    const shoppingURL = process.env.SHOPPING_URL || "http://localhost:8004";
    const analyticsURL = process.env.ANALYTICS_URL || "http://localhost:8005";

    return [
      {
        source: "/aws/catalog/:route*",
        destination: `${catalogURL}/:route*`,
      },
      {
        source: "/aws/auth/:route*",
        destination: `${authURL}/:route*`,
      },
      {
        source: "/aws/orders/:route*",
        destination: `${ordersURL}/:route*`,
      },
      {
        source: "/aws/shoppingCart/:route*",
        destination: `${shoppingURL}/:route*`,
      },
      {
        source: "/aws/analytics/:route*",
        destination: `${analyticsURL}/:route*`,
      },
    ];
  },
};
