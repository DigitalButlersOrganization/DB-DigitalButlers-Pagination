var c = Object.defineProperty;
var p = (h, t, e) => t in h ? c(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var i = (h, t, e) => (p(h, typeof t != "symbol" ? t + "" : t, e), e);
const o = "js--", a = {
  ACTIVE: `${o}active`,
  UNACTIVE: `${o}unactive`,
  VISIBLE: `${o}visible`,
  BUTTON: `${o}pagination-button`,
  CURRENT: `${o}pagination-current`,
  EMPTY_PLACE: `${o}pagination-empty-place`,
  HIDDEN: `${o}hidden-by-pagination`
};
class g {
  constructor(t = '[data-pagination="wrapper"]', { paginationWrapperSelector: e = '[data-pagination="container"]', dynamicElementSelector: s = '.w-dyn-item[role="listitem"]', previousButtonInner: n = "Prev", nextButtonInner: r = "Next", itemsPerPage: l, hiddenButtons: u = {
    min: 6
  } }) {
    i(this, "component");
    i(this, "paginationWrapperSelector");
    i(this, "paginationWrapper");
    i(this, "dynamicElementSelector");
    i(this, "dynamicElements");
    i(this, "previousButtonInner");
    i(this, "nextButtonInner");
    i(this, "itemsPerPage");
    i(this, "url");
    i(this, "currentPage");
    i(this, "totalPages");
    i(this, "buttons");
    i(this, "prevButton");
    i(this, "nextButton");
    i(this, "emptyMapInner");
    i(this, "buttonsMap");
    i(this, "dynamicItemSelector");
    i(this, "hiddenButtons");
    i(this, "init", () => {
      var e;
      const t = this.url.searchParams.get("page");
      this.currentPage = t ? +t : 1, this.paginationWrapper = (e = this.component.querySelector(this.paginationWrapperSelector)) != null ? e : void 0, this.paginationWrapper && (this.initVariables(), this.paginationWrapper.addEventListener("click", this.clickHandler));
    });
    i(this, "initVariables", () => {
      this.dynamicElements = Array.from(this.component.querySelectorAll(this.dynamicElementSelector)), this.totalPages = Math.ceil(this.dynamicElements.length / this.itemsPerPage), this.createButtonsMap(), this.addCustomButtons(), this.goToCurrent();
    });
    i(this, "createButtonsMap", () => {
      const t = [], e = new Array(this.totalPages).fill("").map((n, r) => r + 1), s = (n) => n === 1 || n === this.totalPages || n >= this.currentPage - 1 && n <= this.currentPage + 1;
      e.forEach((n, r) => {
        const l = {
          page: n,
          current: r + 1 === this.currentPage
        };
        s(n) || this.buttons.length < this.hiddenButtons.min ? t.push({
          ...l,
          visible: !0
        }) : s(e[r + 1]) && s(e[r - 1]) ? t.push({
          ...l,
          visible: !0
        }) : t.push({
          ...l,
          visible: !1
        });
      }), this.buttonsMap = t;
    });
    i(this, "addCustomButtons", () => {
      this.totalPages > 1 ? (this.paginationWrapper.classList.remove(a.UNACTIVE), this.addButton({
        label: "Prev page",
        content: this.previousButtonInner
      }), this.buttonsMap.forEach(({ page: t }) => {
        this.addButton({
          label: `Page ${t}`,
          content: t
        });
      }), this.addButton({
        label: "Next page",
        content: this.nextButtonInner
      })) : this.paginationWrapper.classList.add(a.UNACTIVE), this.createButtonsMap(), this.updateButtonsAttrs(), this.addRelLinks();
    });
    i(this, "addButton", ({ content: t, label: e }) => {
      const s = document.createElement("button");
      s.innerHTML = t, s.classList.add(a.BUTTON), s.setAttribute("aria-label", e), s.setAttribute("type", "button"), e === "Prev page" ? this.prevButton = s : e === "Next page" ? this.nextButton = s : this.buttons.push(s), this.paginationWrapper.append(s);
    });
    i(this, "updateButtonsAttrs", () => {
      this.currentPage === 1 ? this.makeDisable(this.prevButton) : this.makeEnable(this.prevButton), this.currentPage === this.totalPages ? this.makeDisable(this.nextButton) : this.makeEnable(this.nextButton), this.buttons.forEach((t, e) => {
        const s = this.buttonsMap[e];
        e + 1 === this.currentPage ? t.classList.add(a.CURRENT) : t.classList.remove(a.CURRENT), !s.visible || s.current ? this.makeDisable(t) : this.makeEnable(t), s.visible ? (t.classList.remove(a.EMPTY_PLACE), t.textContent = s.page) : (t.classList.add(a.EMPTY_PLACE), t.textContent = this.emptyMapInner), s.current ? t.classList.add(a.CURRENT) : t.classList.remove(a.CURRENT);
      });
    });
    i(this, "makeDisable", (t) => {
      t && (t.setAttribute("disabled", "true"), t.setAttribute("tabindex", "-1"));
    });
    i(this, "makeEnable", (t) => {
      t && (t.removeAttribute("disabled"), t.setAttribute("tabindex", "0"));
    });
    i(this, "update", () => {
      this.paginationWrapper.innerHTML = "", this.buttons = [], this.currentPage = 1, this.initVariables();
    });
    i(this, "goToCurrent", () => {
      this.dynamicElements.forEach((t, e) => {
        Math.ceil((e + 1) / this.itemsPerPage) === this.currentPage ? (t.classList.remove(a.HIDDEN), t.removeAttribute("style"), t.removeAttribute("inert")) : (t.classList.add(a.HIDDEN), t.style.display = "none", t.setAttribute("inert", "true"));
      }), this.addPageParam(), this.addRelLinks();
    });
    i(this, "addPageParam", () => {
      this.url = new URL(window.location.href), this.url.searchParams.set("page", this.currentPage.toString()), window.history.pushState({}, "", this.url.href);
    });
    i(this, "clickHandler", (t) => {
      const e = t.target.closest(".js--pagination-button");
      if (e && e.getAttribute("disabled") !== "true") {
        const s = e.getAttribute("aria-label");
        s === "Prev page" ? this.currentPage -= 1 : s === "Next page" ? this.currentPage += 1 : this.currentPage = +s.split(" ")[1], this.goToCurrent(), this.createButtonsMap(), this.updateButtonsAttrs();
      }
    });
    i(this, "addRelLinks", () => {
      if (document.head.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach((e) => e.remove()), this.currentPage > 1) {
        const e = document.createElement("link");
        e.setAttribute("rel", "prev"), e.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage - 1}`), document.head.append(e);
      }
      if (this.currentPage < this.totalPages) {
        const e = document.createElement("link");
        e.setAttribute("rel", "next"), e.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage + 1}`), document.head.append(e);
      }
    });
    this.component = typeof t == "string" ? document.querySelector(t) : t, this.paginationWrapperSelector = e, this.paginationWrapper = void 0, this.dynamicElementSelector = s, this.dynamicElements = [], this.previousButtonInner = n, this.nextButtonInner = r, this.itemsPerPage = l, this.url = new URL(window.location.href), this.currentPage = 1, this.totalPages = 1, this.buttons = [], this.prevButton = void 0, this.nextButton = void 0, this.buttonsMap = [], this.emptyMapInner = "...", this.hiddenButtons = u, this.init();
  }
}
export {
  g as Pagination
};
