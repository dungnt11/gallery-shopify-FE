class SettingsGallery {
  constructor() {
    this.settings = {
      enableOptimizeImage: true,
      maxWidthImage: 500,
      myshopifyDomain: ''
    };

    this.config = {
      isPreviewMode: false,
    }
  }

  setConfig(config) {
    this.config = Object.assign(this.config, config);
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
