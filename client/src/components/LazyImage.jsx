import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
export function LazyImage(_a) {
    var src = _a.src, alt = _a.alt, className = _a.className, _b = _a.placeholder, placeholder = _b === void 0 ? 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E' : _b;
    var _c = useState(placeholder), imageSrc = _c[0], setImageSrc = _c[1];
    var _d = useState(null), imageRef = _d[0], setImageRef = _d[1];
    var _e = useState(false), isLoaded = _e[0], setIsLoaded = _e[1];
    useEffect(function () {
        var observer;
        if (imageRef && imageSrc === placeholder) {
            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setImageSrc(src);
                        observer.unobserve(imageRef);
                    }
                });
            }, {
                rootMargin: '50px',
            });
            observer.observe(imageRef);
        }
        return function () {
            if (observer && imageRef) {
                observer.unobserve(imageRef);
            }
        };
    }, [imageRef, imageSrc, src, placeholder]);
    return (<img ref={setImageRef} src={imageSrc} alt={alt} className={cn('transition-opacity duration-300', isLoaded ? 'opacity-100' : 'opacity-0', className)} onLoad={function () { return setIsLoaded(true); }} loading="lazy"/>);
}
