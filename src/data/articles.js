// Import images
import article5 from "../assets/article5.jpg";
import deep from "../assets/deep.jpg";
import download from "../assets/download.jpg";

/**
 * @typedef {Object} Article
 * @property {string} slug - Unique identifier
 * @property {string} title - Article title
 * @property {string} excerpt - Short preview text
 * @property {string} content - Full article content
 * @property {string} author - Author name
 * @property {string} date - Publication date in ISO format
 * @property {string} image - Featured image URL
 * @property {string} category - Article category
 * @property {string} readTime - Estimated reading time
 * @property {string[]} tags - Related tags
 * @property {boolean} isFeatured - Whether the article is featured
 * @property {string} [background] - Optional background image URL
 */

/** @type {Article[]} */
export const articles = [
  {
    slug: "fiber-internet-light-speed",
    title: "The Power of Fiber: Internet That Moves at Light Speed",
    excerpt: "Explore why fiber internet is a game-changer in connectivity.",
    content: `Fiber internet uses light to transmit data at blazing speeds, offering higher bandwidth and lower latency compared to traditional copper lines. With Kenya rapidly deploying fiber across urban and rural zones, the digital divide is shrinking fast.`,
    author: "Tech Editorial Team",
    date: "2025-05-26",
    image: article5,
    category: "technology",
    readTime: "5 min",
    tags: ["Innovation", "Infrastructure"],
    isFeatured: true,
    background: deep,
  },
  {
    slug: "rural-connectivity-benefits",
    title: "Connecting the Unconnected: The Benefits of Rural Internet",
    excerpt:
      "High-speed internet in rural areas enables access to education, health, and economic growth.",
    content: `Rural internet opens doors to digital education, telemedicine, e-commerce, and much more. It's a catalyst for community transformation, enabling local talent to thrive in the global economy.`,
    author: "Knoxfill Research Team",
    date: "2025-04-10",
    image: download,
    category: "community",
    readTime: "4 min",
    tags: ["Access", "Community", "Equity"],
    isFeatured: false,
    background: download,
  },
  {
    slug: "installation-process-guide",
    title: "Smooth Installation: What to Expect and How to Prepare",
    excerpt:
      "Understand the steps involved in setting up your fiber connection at home or office.",
    content: `From checking local infrastructure to scheduling and access requirements, this guide walks you through how to get your fiber installed without delays.`,
    author: "Customer Support",
    date: "2025-03-22",
    image: article5,
    category: "guides",
    readTime: "3 min",
    tags: ["Installation", "Customer Help"],
    isFeatured: false,
    background: deep,
  },
];

// === Helper Functions ===

/**
 * Returns all featured articles.
 * @returns {Article[]}
 */
export const getFeaturedArticles = () =>
  articles.filter((article) => article.isFeatured);

/**
 * Filters articles by category.
 * @param {string} category
 * @returns {Article[]}
 */
export const getArticlesByCategory = (category) =>
  category === "all"
    ? articles
    : articles.filter((article) => article.category === category);

/**
 * Searches articles by text query.
 * @param {string} query
 * @returns {Article[]}
 */
export const searchArticles = (query) => {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery)
  );
};
