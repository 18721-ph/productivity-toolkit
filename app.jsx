// productivityToolkit.js

const ProductivityToolkit = {
  // Delay execution
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // Debounce
  debounce(fn, delay = 300) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  },

  // Throttle
  throttle(fn, limit = 300) {
    let waiting = false;

    return (...args) => {
      if (!waiting) {
        fn(...args);
        waiting = true;

        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  },

  // Retry async function
  async retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i === retries - 1) throw err;
        await this.sleep(delay);
      }
    }
  },

  // Generate unique ID
  uuid() {
    return crypto.randomUUID();
  },

  // Deep clone object
  clone(obj) {
    return structuredClone(obj);
  },

  // Format today's date
  formatDate(date = new Date()) {
    return date.toLocaleDateString("en-KE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  },

  // Copy text
  async copy(text) {
    await navigator.clipboard.writeText(text);
    console.log("Copied!");
  },

  // Download JSON
  downloadJSON(data, filename = "data.json") {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  },

  // Local storage
  storage: {
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },

    remove(key) {
      localStorage.removeItem(key);
    },

    clear() {
      localStorage.clear();
    }
  }
};
//print the value of the ProductivityToolkit object to the console
export default ProductivityToolkit;