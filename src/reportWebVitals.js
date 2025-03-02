/**
 * Performance Monitoring Module
 * Handles collection and reporting of web vital metrics
 */

// === METRICS COLLECTION === 
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // === DYNAMIC IMPORT OF WEB-VITALS ===
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // === CORE WEB VITALS MEASUREMENT ===
      // CLS - Cumulative Layout Shift
      getCLS(onPerfEntry);
      // FID - First Input Delay
      getFID(onPerfEntry);
      // FCP - First Contentful Paint
      getFCP(onPerfEntry);
      // LCP - Largest Contentful Paint
      getLCP(onPerfEntry);
      // TTFB - Time to First Byte
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
