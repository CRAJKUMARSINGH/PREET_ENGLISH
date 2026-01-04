import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export function SEOHead({
    title = "Preet English - Master Key to English",
    description = "Learn English through Hindi with structured lessons, interactive practice, and a daily learning plan.",
    image = "/og-image.jpg",
    url = "https://preetenglish.com"
}: SEOHeadProps) {

    const siteTitle = title === "Preet English - Master Key to English" ? title : `${title} | Preet English`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
}
