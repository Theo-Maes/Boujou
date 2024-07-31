module.exports = {
  extends: "lighthouse:default",
  settings: {
    formFactor: "desktop",
    onlyCategories: ["accessibility", "best-practices", "seo"],
  },
};
