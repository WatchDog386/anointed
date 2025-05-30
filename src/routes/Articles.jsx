import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { useLanguage } from "../contexts/LanguageContext";
import { articles } from "../data/articles";

const gradientBg = "linear-gradient(to bottom right, #000000, #0f172a, #1e293b)";

const LoadingSkeleton = () => (
  <div className="text-center text-gray-400 py-10">Loading articles...</div>
);

const ErrorFallback = ({ message }) => (
  <div className="text-center text-red-500 py-10">{message}</div>
);

const ArticleCard = React.memo(({ article }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 border border-white/10 backdrop-blur-md hover:shadow-lg hover:border-cyan-400/40 transition-all"
  >
    <Link to={`/articles/${article.slug}`}>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300">
          {article.title}
        </h3>
        <p className="text-sm text-gray-400">{article.excerpt}</p>
      </div>
    </Link>
  </motion.article>
));

const FeaturedArticle = ({ article }) => {
  if (!article) return null;
  return (
    <motion.article
      className="overflow-hidden rounded-3xl mb-16 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-white/10 backdrop-blur-lg hover:shadow-2xl transition-all"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link to={`/articles/${article.slug}`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-72 object-cover rounded-t-3xl"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{article.title}</h2>
          <p className="text-gray-300">{article.excerpt}</p>
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
    () => articles.find((a) => a.isFeatured),
    []
  );

  return (
    <section
      className="relative min-h-screen py-24 px-4 md:px-10 overflow-hidden"
      style={{ background: gradientBg }}
    >
      <div className="max-w-6xl mx-auto text-white">
        <h1 className="text-5xl font-bold text-center text-cyan-400 mb-12">
          {t("titles.knowledgeHub") || "Knowledge Hub"}
        </h1>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition border ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-cyan-500/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder={t("placeholders.searchArticles") || "Search articles..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Featured */}
        <FeaturedArticle article={featuredArticle} />

        {/* Article Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              {t("messages.noArticlesFound") || "No articles found."}
            </p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
