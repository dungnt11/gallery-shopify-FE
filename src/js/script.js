import { getJsonByShop } from './helper/get-json';

class Main {
  constructor() {
    this.init();    
  }
  
  async init() {
    try {
      const galleryDB = await getJsonByShop();
      console.log(galleryDB);
      let gallery     = galleryDB.gallery,
          colGap      = gallery.columnGap,
          rowGap      = gallery.rowGap,
          title       = gallery.title,
          description = gallery.description,
          effect      = gallery.effectSelect
      let _html = `<div class="container">
                    <div class="dtt-heading"><h2>${title}</h2><p>${description}</p></div>
                    <div class="dtt-grid" 
                       style="--columnGap_xl: ${colGap.xl}px;--columnGap_lg: ${colGap.lg}px;--columnGap_md: ${colGap.md}px;--columnGap_sm: ${colGap.sm}px;--columnGap_xs: ${colGap.xs}px;
                              --rowGap_xl: ${rowGap.xl}px;--rowGap_lg: ${rowGap.lg}px;--rowGap_md: ${rowGap.md}px;--rowGap_sm: ${rowGap.sm}px;--rowGap_xs: ${rowGap.xs}px;">`;

      galleryDB.images.map(function (v, i) {
        console.log(v);
        _html += `
          <div class="dtt-col">
            <div class="hovereffect${effect} e-image-item" style="background: ${v.effect.color};">
              <img class="img-responsive" src="${v.src}" alt="">
              <div class="overlay">
                <h2>${v.effect.title}</h2>
                <a class="info" href="${v.effect.link}">${v.effect.description}</a>
              </div>
            </div>
          </div>
        `
      });
      _html += '</div></div>';
      document.querySelectorAll(".hello")[0].innerHTML = _html;

    } catch (error) {
      console.log(error);
    }
  }
}

new Main();