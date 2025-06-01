import sitemapGenerator from 'sitemap-generator';

// Initialize the sitemap generator
const generator = sitemapGenerator('https://www.knoxvilletechnologies.com', {
  stripQuerystring: true,
  filepath: './public/sitemap.xml',
  maxDepth: 0,
});

// Event listener for when sitemap is done generating
generator.on('done', () => {
  console.log('✅ Sitemap generation complete');
});

// Start the generator
generator.start();
