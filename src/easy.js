(function (global) {
    'use strict';

    /**
     * EasyJS Utilities — lightweight DOM helpers
     * Author: Il Tuo Nome
     * License: MIT
     */

    // Selector helper
    const sel = (el, all = false, parent = document) => {
        if (!el) return all ? [] : null;
        if (typeof el !== 'string') return all ? [el] : el;
        el = el.trim();
        return all ? [...parent.querySelectorAll(el)] : parent.querySelector(el);
    };

    // Event listener helper
    const on = (type, el, listener, all = false) => {
        const elements = sel(el, all);
        if (!elements || (Array.isArray(elements) && elements.length === 0)) return null;

        if (all && Array.isArray(elements)) {
            elements.forEach(item => item.addEventListener(type, e => listener(item, e)));
            return elements;
        } else {
            elements.addEventListener(type, e => listener(elements, e));
            return elements;
        }
    };

    // Class management
    const manageClasses = (el, classes, handler) => {
        if (!el || !classes) return [];
        if (!Array.isArray(classes)) classes = classes.split(/\s+/).filter(Boolean);
        const items = sel(el, true);
        if (items.length > 0) {
            classes.forEach(cl => items.forEach(item => handler(item, cl)));
        }
        return items;
    };

    const addClass = (el, classes) => manageClasses(el, classes, (item, cl) => item.classList.add(cl));
    const removeClass = (el, classes) => manageClasses(el, classes, (item, cl) => item.classList.remove(cl));
    const toggleClass = (el, classes) => manageClasses(el, classes, (item, cl) => item.classList.toggle(cl));
    const hasClass = (el, classes) => {
        const item = sel(el, false);
        if (!item) return false;
        return classes.split(/\s+/).every(cl => item.classList.contains(cl));
    };

    // Content manipulation
    const setHtml = (el, html) => {
        const item = sel(el, false);
        if (item) item.innerHTML = html;
        return item;
    };

    // Event triggering
    const trigger = (el, eventName) => {
        const item = sel(el, false);
        if (item) item.dispatchEvent(new Event(eventName, { bubbles: true }));
        return item;
    };

    const triggerChange = el => trigger(el, 'change');

    // Style helpers
    const getStyle = el => {
        const item = sel(el, false);
        if (!item) return {};
        return item.currentStyle || window.getComputedStyle(item);
    };

    const cssMarginLeft = el => getStyle(el).marginLeft;
    const cssMarginRight = el => getStyle(el).marginRight;
    const cssWidth = el => getStyle(el).width;

    const cssMarginLeftPx = el => parseFloat(cssMarginLeft(el)) || 0;
    const cssMarginRightPx = el => parseFloat(cssMarginRight(el)) || 0;
    const cssWidthPx = el => parseFloat(cssWidth(el)) || 0;

    // Event shortcuts
    const onLoad = (el, listener, all = false) => on('load', el, listener, all);
    const onReady = listener => {
        if (document.readyState !== 'loading') listener(document);
        else document.addEventListener('DOMContentLoaded', () => listener(document));
    };
    const onClick = (el, listener, all = false) => on('click', el, listener, all);
    const onScroll = (el, listener, all = false) => on('scroll', el, listener, all);
    const onSubmit = (el, listener, all = false) => on('submit', el, listener, all);
    const onBlur = (el, listener, all = false) => on('blur', el, listener, all);
    const onChange = (el, listener, all = false) => on('change', el, listener, all);

    // Validated submit
    const onValidSubmit = (el, validCallback, all = false) =>
        onSubmit(el, (form, event) => {
            event.preventDefault();
            event.stopPropagation();

            addClass(form, 'was-validated');

            if (!form.checkValidity()) return;

            const formData = new FormData(form);
            const plainData = Object.fromEntries(formData.entries());

            validCallback(form, plainData, event);
        }, all);

    // Public API
    const easy = {
        sel,
        on,
        addClass,
        removeClass,
        toggleClass,
        hasClass,
        setHtml,
        trigger,
        triggerChange,
        getStyle,
        cssMarginLeft,
        cssMarginRight,
        cssWidth,
        cssMarginLeftPx,
        cssMarginRightPx,
        cssWidthPx,
        onLoad,
        onReady,
        onClick,
        onScroll,
        onSubmit,
        onBlur,
        onChange,
        onValidSubmit
    };

    // Expose globally and as module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = easy;
    } else if (typeof define === 'function' && define.amd) {
        define([], () => easy);
    } else {
        global.easy = easy;
    }

})(typeof window !== 'undefined' ? window : this);
