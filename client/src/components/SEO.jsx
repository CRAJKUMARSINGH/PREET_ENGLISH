import { useEffect } from "react";
export function SEO(_a) {
    var title = _a.title, description = _a.description, ogTitle = _a.ogTitle, ogDescription = _a.ogDescription, ogImage = _a.ogImage, _b = _a.ogType, ogType = _b === void 0 ? "website" : _b, _c = _a.author, author = _c === void 0 ? "Preet English" : _c;
    var baseTitle = "Preet English - Learn English with Hindi Support";
    var finalTitle = title ? "".concat(title, " | Preet English") : baseTitle;
    var baseDescription = "Learn English effectively with Hindi translations and support. 1625+ interactive lessons, speaking practice, and gamified learning.";
    useEffect(function () {
        // Update Title
        document.title = finalTitle;
        // Update Meta Description
        var metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", description || baseDescription);
        }
        // Update OG Tags
        var ogTags = {
            "og:title": ogTitle || finalTitle,
            "og:description": ogDescription || description || baseDescription,
            "og:type": ogType,
            "og:image": ogImage || "https://preetenglish.netlify.app/og-image.jpg",
        };
        Object.entries(ogTags).forEach(function (_a) {
            var property = _a[0], content = _a[1];
            var tag = document.querySelector("meta[property=\"".concat(property, "\"]"));
            if (tag) {
                tag.setAttribute("content", content);
            }
        });
        // Update Twitter Tags
        var twitterTags = {
            "twitter:title": ogTitle || finalTitle,
            "twitter:description": ogDescription || description || baseDescription,
            "twitter:image": ogImage || "https://preetenglish.netlify.app/og-image.jpg",
        };
        Object.entries(twitterTags).forEach(function (_a) {
            var name = _a[0], content = _a[1];
            var tag = document.querySelector("meta[name=\"".concat(name, "\"]"));
            if (tag) {
                tag.setAttribute("content", content);
            }
        });
    }, [title, description, ogTitle, ogDescription, ogImage, ogType, finalTitle, baseDescription]);
    return null; // Side-effect only component
}
