import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
export function formatNumber(num, options) {
    var _a = options || {}, _b = _a.decimals, decimals = _b === void 0 ? 0 : _b, _c = _a.separator, separator = _c === void 0 ? ',' : _c, _d = _a.prefix, prefix = _d === void 0 ? '' : _d, _e = _a.suffix, suffix = _e === void 0 ? '' : _e;
    var fixed = num.toFixed(decimals);
    var parts = fixed.split('.');
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return "".concat(prefix).concat(parts.join('.')).concat(suffix);
}
export function debounce(func, wait) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () { return func.apply(void 0, args); }, wait);
    };
}
export function throttle(func, limit) {
    var inThrottle;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!inThrottle) {
            func.apply(void 0, args);
            inThrottle = true;
            setTimeout(function () { return (inThrottle = false); }, limit);
        }
    };
}
export function generateId(prefix) {
    if (prefix === void 0) { prefix = 'id'; }
    return "".concat(prefix, "-").concat(Math.random().toString(36).substr(2, 9));
}
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export function lerp(start, end, factor) {
    return start + (end - start) * factor;
}
export function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}
export function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
export function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
export function hexToRgba(hex, alpha) {
    if (alpha === void 0) { alpha = 1; }
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
}
export function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength - 3) + '...';
}
export function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function formatTimeAgo(date) {
    var now = new Date();
    var diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60)
        return 'just now';
    if (diffInSeconds < 3600)
        return "".concat(Math.floor(diffInSeconds / 60), "m ago");
    if (diffInSeconds < 86400)
        return "".concat(Math.floor(diffInSeconds / 3600), "h ago");
    if (diffInSeconds < 2592000)
        return "".concat(Math.floor(diffInSeconds / 86400), "d ago");
    return date.toLocaleDateString();
}
export function getContrastColor(hexColor) {
    // Remove # if present
    var hex = hexColor.replace('#', '');
    // Convert to RGB
    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);
    // Calculate luminance
    var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
}
export function createGradient(colors, direction) {
    if (direction === void 0) { direction = 'to right'; }
    return "linear-gradient(".concat(direction, ", ").concat(colors.join(', '), ")");
}
export function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
