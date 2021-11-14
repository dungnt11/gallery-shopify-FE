class SettingsGallery {
  constructor() {
    this.settings = {
      enableOptimizeImage: false,
      maxWidthImage: 500,
      myshopifyDomain: ''
    };
  }

  updateSettings(settings) {
    this.settings = settings;
  }

  get settingsGallery() {
    return this.settings;
  }
}

const settingsGallery = new SettingsGallery();

export { settingsGallery };
