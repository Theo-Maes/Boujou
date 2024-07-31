module.exports = {
  extends: "lighthouse:default",
  settings: {
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
    },
    emulatedFormFactor: "desktop",
    formFactor: "desktop",
    onlyCategories: ["accessibility", "best-practices", "seo", "performance"],
  },
};
