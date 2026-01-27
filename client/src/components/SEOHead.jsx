import { Helmet } from 'react-helmet-async';
export function SEOHead(_a) {
    var _b = _a.title, title = _b === void 0 ? "Preet English - Master Key to English" : _b, _c = _a.description, description = _c === void 0 ? "Learn English through Hindi with structured lessons, interactive practice, and a daily learning plan." : _c, _d = _a.image, image = _d === void 0 ? "/og-image.jpg" : _d, _e = _a.url, url = _e === void 0 ? "https://preetenglish.com" : _e;
    var siteTitle = title === "Preet English - Master Key to English" ? title : "".concat(title, " | Preet English");
    return (<Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle}/>
            <meta name="description" content={description}/>

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={siteTitle}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={url}/>
            <meta property="twitter:title" content={siteTitle}/>
            <meta property="twitter:description" content={description}/>
            <meta property="twitter:image" content={image}/>
        </Helmet>);
}
