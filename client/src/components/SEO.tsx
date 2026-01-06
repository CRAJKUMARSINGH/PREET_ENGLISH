import { useEffect } from "react";

interface SEOProps {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: "website" | "article" | "profile";
    author?: string;
}

export function SEO({
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = "website",
    author = "Preet English",
}: SEOProps) {
    const baseTitle = "Preet English - Learn English with Hindi Support";
    const finalTitle = title ? `${title} | Preet English` : baseTitle;
    const baseDescription = "Learn English effectively with Hindi translations and support. 1625+ interactive lessons, speaking practice, and gamified learning.";

    useEffect(() => {
        // Update Title
        document.title = finalTitle;

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", description || baseDescription);
        }

        // Update OG Tags
        const ogTags = {
            "og:title": ogTitle || finalTitle,
            "og:description": ogDescription || description || baseDescription,
            "og:type": ogType,
            "og:image": ogImage || "https://preetenglish.netlify.app/og-image.jpg",
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            const tag = document.querySelector(`meta[property="${property}"]`);
            if (tag) {
                tag.setAttribute("content", content);
            }
        });

        // Update Twitter Tags
        const twitterTags = {
            "twitter:title": ogTitle || finalTitle,
            "twitter:description": ogDescription || description || baseDescription,
            "twitter:image": ogImage || "https://preetenglish.netlify.app/og-image.jpg",
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            const tag = document.querySelector(`meta[name="${name}"]`);
            if (tag) {
                tag.setAttribute("content", content);
            }
        });

    }, [title, description, ogTitle, ogDescription, ogImage, ogType, finalTitle, baseDescription]);

    return null; // Side-effect only component
}
