var m = Object.defineProperty;
var P = (h, t, s) => t in h ? m(h, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : h[t] = s;
var i = (h, t, s) => (P(h, typeof t != "symbol" ? t + "" : t, s), s);
const o = "js--", n = {
  ACTIVE: `${o}active`,
  UNACTIVE: `${o}unactive`,
  VISIBLE: `${o}visible`,
  BUTTON: `${o}pagination-button`,
  CURRENT: `${o}pagination-current`,
  EMPTY_PLACE: `${o}pagination-empty-place`,
  HIDDEN: `${o}hidden-by-pagination`
};
class B {
  constructor(t = '[data-pagination="wrapper"]', { paginationWrapperSelector: s = '[data-pagination="container"]', dynamicElementSelector: e = '.w-dyn-item[role="listitem"]', previousButtonInner: a = "Prev", nextButtonInner: r = "Next", previousButtonClassnames: l = [], nextButtonClassnames: u = [], regularButtonClassnames: c = [], itemsPerPage: p, hiddenButtons: d = {
    min: 6
  }, on: g = {} }) {
    i(this, "component");
    i(this, "paginationWrapperSelector");
    i(this, "paginationWrapper");
    i(this, "dynamicElementSelector");
    i(this, "dynamicElements");
    i(this, "previousButtonInner");
    i(this, "nextButtonInner");
    i(this, "itemsPerPage");
    i(this, "previousButtonClassnames");
    i(this, "nextButtonClassnames");
    i(this, "regularButtonClassnames");
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
    i(this, "on");
    i(this, "init", () => {
      var s, e, a;
      const t = this.url.searchParams.get("page");
      this.currentPage = t ? +t : 1, this.paginationWrapper = (s = this.component.querySelector(this.paginationWrapperSelector)) != null ? s : void 0, this.paginationWrapper && (this.initVariables(), this.paginationWrapper.addEventListener("click", this.clickHandler)), (a = (e = this.on) == null ? void 0 : e.afterInit) == null || a.call(e, this);
    });
    i(this, "initVariables", () => {
      this.dynamicElements = Array.from(this.component.querySelectorAll(this.dynamicElementSelector)), this.totalPages = Math.ceil(this.dynamicElements.length / this.itemsPerPage), this.createButtonsMap(), this.addCustomButtons(), this.goToCurrent();
    });
    i(this, "createButtonsMap", () => {
      const t = [], s = new Array(this.totalPages).fill("").map((a, r) => r + 1), e = (a) => a === 1 || a === this.totalPages || a >= this.currentPage - 1 && a <= this.currentPage + 1;
      s.forEach((a, r) => {
        const l = {
          page: a,
          current: r + 1 === this.currentPage
        };
        e(a) || this.buttons.length < this.hiddenButtons.min ? t.push({
          ...l,
          visible: !0
        }) : e(s[r + 1]) && e(s[r - 1]) ? t.push({
          ...l,
          visible: !0
        }) : t.push({
          ...l,
          visible: !1
        });
      }), this.buttonsMap = t;
    });
    i(this, "addCustomButtons", () => {
      this.totalPages > 1 ? (this.paginationWrapper.classList.remove(n.UNACTIVE), this.addButton({
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
      })) : this.paginationWrapper.classList.add(n.UNACTIVE), this.createButtonsMap(), this.updateButtonsAttrs(), this.addRelLinks();
    });
    i(this, "addButton", ({ content: t, label: s }) => {
      const e = document.createElement("button");
      e.innerHTML = t, e.classList.add(n.BUTTON), e.setAttribute("aria-label", s), e.setAttribute("type", "button"), s === "Prev page" ? (e.classList.add(...this.previousButtonClassnames), this.prevButton = e) : s === "Next page" ? (e.classList.add(...this.nextButtonClassnames), this.nextButton = e) : (e.classList.add(...this.regularButtonClassnames), this.buttons.push(e)), this.paginationWrapper.append(e);
    });
    i(this, "updateButtonsAttrs", () => {
      this.currentPage === 1 ? this.makeDisable(this.prevButton) : this.makeEnable(this.prevButton), this.currentPage === this.totalPages ? this.makeDisable(this.nextButton) : this.makeEnable(this.nextButton), this.buttons.forEach((t, s) => {
        const e = this.buttonsMap[s];
        s + 1 === this.currentPage ? t.classList.add(n.CURRENT) : t.classList.remove(n.CURRENT), !e.visible || e.current ? this.makeDisable(t) : this.makeEnable(t), e.visible ? (t.classList.remove(n.EMPTY_PLACE), t.textContent = e.page) : (t.classList.add(n.EMPTY_PLACE), t.textContent = this.emptyMapInner), e.current ? t.classList.add(n.CURRENT) : t.classList.remove(n.CURRENT);
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
      var t, s;
      this.dynamicElements.forEach((e, a) => {
        Math.ceil((a + 1) / this.itemsPerPage) === this.currentPage ? (e.classList.remove(n.HIDDEN), e.removeAttribute("style"), e.removeAttribute("inert")) : (e.classList.add(n.HIDDEN), e.style.display = "none", e.setAttribute("inert", "true"));
      }), this.addPageParam(), this.addRelLinks(), (s = (t = this.on) == null ? void 0 : t.change) == null || s.call(t, this);
    });
    i(this, "addPageParam", () => {
      this.url = new URL(window.location.href), this.url.searchParams.set("page", this.currentPage.toString()), window.history.pushState({}, "", this.url.href);
    });
    i(this, "clickHandler", (t) => {
      const s = t.target.closest(".js--pagination-button");
      if (s && s.getAttribute("disabled") !== "true") {
        const e = s.getAttribute("aria-label");
        e === "Prev page" ? this.currentPage -= 1 : e === "Next page" ? this.currentPage += 1 : this.currentPage = +e.split(" ")[1], this.goToCurrent(), this.createButtonsMap(), this.updateButtonsAttrs();
      }
    });
    i(this, "addRelLinks", () => {
      if (document.head.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach((s) => s.remove()), this.currentPage > 1) {
        const s = document.createElement("link");
        s.setAttribute("rel", "prev"), s.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage - 1}`), document.head.append(s);
      }
      if (this.currentPage < this.totalPages) {
        const s = document.createElement("link");
        s.setAttribute("rel", "next"), s.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage + 1}`), document.head.append(s);
      }
    });
    this.component = typeof t == "string" ? document.querySelector(t) : t, this.paginationWrapperSelector = s, this.paginationWrapper = void 0, this.dynamicElementSelector = e, this.dynamicElements = [], this.previousButtonInner = a, this.nextButtonInner = r, this.itemsPerPage = p, this.url = new URL(window.location.href), this.currentPage = 1, this.totalPages = 1, this.buttons = [], this.prevButton = void 0, this.nextButton = void 0, this.buttonsMap = [], this.emptyMapInner = "...", this.hiddenButtons = d, this.on = g, this.previousButtonClassnames = l, this.nextButtonClassnames = u, this.regularButtonClassnames = c, this.init();
  }
}
export {
  B as Pagination
};
