// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'article',
  publishedTime,
  modifiedTime,
  author = 'USM-KCC',
  keywords = ''
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://usmkcc.edu.ph';
  
  // Ensure image URL is absolute
  const getAbsoluteImageUrl = (img) => {
    if (!img) return `${siteUrl}/images/usm-logo.png`;
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (img.startsWith('/')) return `${siteUrl}${img}`;
    return `${siteUrl}/${img}`;
  };

  const imageUrl = getAbsoluteImageUrl(image);
  const pageTitle = title ? `${title} | USM-KCC` : 'USM-KCC | University of Southern Mindanao - Kidapawan City Campus';
  const pageDescription = description || 'Official website of USM-Kidapawan City Campus. Offering quality education in engineering, education, arts and sciences, and technology programs.';
  const pageUrl = url || 'https://usmkcc.edu.ph/';
  
  // Determine content type for schema
  const schemaType = type === 'article' ? 'Article' : 
                     type === 'announcement' ? 'Announcement' : 
                     type === 'event' ? 'Event' : 'WebPage';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="USM-KCC" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@usmkc" />
      <meta name="twitter:creator" content="@usmkc" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:publisher" content="University of Southern Mindanao - Kidapawan City Campus" />
        </>
      )}
      
      {/* Event specific meta tags */}
      {type === 'event' && (
        <>
          {publishedTime && <meta property="event:start_time" content={publishedTime} />}
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": schemaType,
          "headline": pageTitle,
          "description": pageDescription,
          "image": imageUrl,
          "url": pageUrl,
          "datePublished": publishedTime || new Date().toISOString(),
          "dateModified": modifiedTime || new Date().toISOString(),
          "author": {
            "@type": "Organization",
            "name": "USM-KCC"
          },
          "publisher": {
            "@type": "Organization",
            "name": "University of Southern Mindanao - Kidapawan City Campus",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/images/usm-logo.png`
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;