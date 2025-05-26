import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { useLanguage } from "../contexts/LanguageContext";
import { articles } from "../data/articles";

// Placeholder fallback components
const LoadingSkeleton = () => (
  <div className="text-center text-gray-400 py-10">Loading articles...</div>
);
const ErrorFallback = ({ message }) => (
  <div className="text-center text-red-500 py-10">{message}</div>
);

// Gradient to match Hero/About
const gradientBackground =
  "linear-gradient(to bottom right, #000000, #111827, #ffffff)";

// Card for each article
const ArticleCard = React.memo(({ article }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 backdrop-blur-lg border-2 border-white/10 hover:border-cyan-400/30 transition-all duration-500"
    >
      <Link to={`/articles/${article.slug}`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{article.title}</h3>
          <p className="text-gray-400 text-sm">{article.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
});

// Featured Article
const FeaturedArticle = ({ article }) => {
  if (!article) return null;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-br from-blue-500/30 to-cyan-400/20 backdrop-blur-lg border-2 border-white/10 hover:border-cyan-400/30 transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link to={`/articles/${article.slug}`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-72 object-cover rounded-t-3xl"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
          <p className="text-gray-300 text-sm">{article.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
};

export default function Articles() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 300);

  const categories = useMemo(
    () => [
      { id: "all", label: t("categories.all") || "All" },
      { id: "technology", label: t("categories.technology") || "Technology" },
      { id: "community", label: t("categories.community") || "Community" },
      { id: "guides", label: t("categories.guides") || "Guides" },
    ],
    [t]
  );

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedSearch]);

  const featuredArticle = useMemo(
    () => articles.find((article) => article.isFeatured),
    []
  );

  return (
    <section
      className="relative min-h-screen py-24 px-4 md:px-10 text-white overflow-hidden"
      style={{ background: gradientBackground }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-cyan-400 mb-12">
          {t("titles.knowledgeHub") || "Knowledge Hub"}
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-white"
                  : "border-gray-700 text-gray-400 hover:bg-cyan-500/10"
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder={
              t("placeholders.searchArticles") || "Search articles..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black/30 text-white border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Featured Article */}
        <FeaturedArticle article={featuredArticle} />

        {/* Article Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            {t("messages.noArticlesFound") || "No articles found."}
          </p>
        )}
      </div>
    </section>
  );
}
