module.exports = {
  extends: "lighthouse:default",
  settings: {
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
    },
    emulatedFormFactor: "desktop",
    formFactor: "desktop",
    onlyCategories: ["accessibility", "best-practices", "seo", "performance"],
  },
};
