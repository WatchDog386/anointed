import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { articles } from "../data/articles";
import { useLanguage } from "../contexts/LanguageContext";
import ErrorFallback from "../components/ErrorFallback"; // adjust if placed elsewhere

// Optional loading placeholder
const LoadingSkeleton = () => (
  <div className="text-center text-gray-400 py-20">Loading article...</div>
);

// Optional default background
const defaultBackground =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac";

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const foundArticle = articles.find((item) => item.slug === slug);
        if (!foundArticle) throw new Error("Article not found");
        setArticle(foundArticle);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <div
      className="min-h-screen text-white bg-cover bg-center bg-fixed px-6 py-20 md:px-16"
      style={{
        backgroundImage: `url(${article.background || defaultBackground})`,
      }}
    >
      <motion.div
        className="max-w-4xl mx-auto backdrop-blur-md bg-black/60 p-8 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* SEO Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            image: article.image,
            datePublished: article.date,
            author: { "@type": "Person", name: article.author },
          })}
        </script>

        {/* Article Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full rounded-lg mb-6"
        />

        {/* Title & Meta */}
        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          {article.author} • {new Date(article.date).toLocaleDateString()}
        </p>

        {/* Content */}
        <p className="text-lg leading-8 text-gray-200 whitespace-pre-line">
          {article.content}
        </p>

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/articles")}
            className="bg-cyan-400/90 text-gray-900 px-6 py-3 rounded-lg hover:bg-cyan-300 transition-colors duration-300"
            aria-label={t("aria.back_to_articles") || "Go back"}
          >
            ← {t("actions.back_to_articles") || "Back to Articles"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(ArticleDetail);
