var p = Object.defineProperty;
var d = (h, t, e) => t in h ? p(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var s = (h, t, e) => (d(h, typeof t != "symbol" ? t + "" : t, e), e);
const o = "js--", a = {
  ACTIVE: `${o}active`,
  UNACTIVE: `${o}unactive`,
  VISIBLE: `${o}visible`,
  BUTTON: `${o}pagination-button`,
  CURRENT: `${o}pagination-current`,
  EMPTY_PLACE: `${o}pagination-empty-place`,
  HIDDEN: `${o}hidden-by-pagination`
};
class m {
  constructor(t = '[data-pagination="wrapper"]', { paginationWrapperSelector: e = '[data-pagination="container"]', dynamicElementSelector: i = '.w-dyn-item[role="listitem"]', previousButtonInner: n = "Prev", nextButtonInner: r = "Next", itemsPerPage: l, hiddenButtons: u = {
    min: 6
  }, on: c = {} }) {
    s(this, "component");
    s(this, "paginationWrapperSelector");
    s(this, "paginationWrapper");
    s(this, "dynamicElementSelector");
    s(this, "dynamicElements");
    s(this, "previousButtonInner");
    s(this, "nextButtonInner");
    s(this, "itemsPerPage");
    s(this, "url");
    s(this, "currentPage");
    s(this, "totalPages");
    s(this, "buttons");
    s(this, "prevButton");
    s(this, "nextButton");
    s(this, "emptyMapInner");
    s(this, "buttonsMap");
    s(this, "dynamicItemSelector");
    s(this, "hiddenButtons");
    s(this, "on");
    s(this, "init", () => {
      var e, i, n;
      const t = this.url.searchParams.get("page");
      this.currentPage = t ? +t : 1, this.paginationWrapper = (e = this.component.querySelector(this.paginationWrapperSelector)) != null ? e : void 0, this.paginationWrapper && (this.initVariables(), this.paginationWrapper.addEventListener("click", this.clickHandler)), (n = (i = this.on) == null ? void 0 : i.afterInit) == null || n.call(i, this);
    });
    s(this, "initVariables", () => {
      this.dynamicElements = Array.from(this.component.querySelectorAll(this.dynamicElementSelector)), this.totalPages = Math.ceil(this.dynamicElements.length / this.itemsPerPage), this.createButtonsMap(), this.addCustomButtons(), this.goToCurrent();
    });
    s(this, "createButtonsMap", () => {
      const t = [], e = new Array(this.totalPages).fill("").map((n, r) => r + 1), i = (n) => n === 1 || n === this.totalPages || n >= this.currentPage - 1 && n <= this.currentPage + 1;
      e.forEach((n, r) => {
        const l = {
          page: n,
          current: r + 1 === this.currentPage
        };
        i(n) || this.buttons.length < this.hiddenButtons.min ? t.push({
          ...l,
          visible: !0
        }) : i(e[r + 1]) && i(e[r - 1]) ? t.push({
          ...l,
          visible: !0
        }) : t.push({
          ...l,
          visible: !1
        });
      }), this.buttonsMap = t;
    });
    s(this, "addCustomButtons", () => {
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
    s(this, "addButton", ({ content: t, label: e }) => {
      const i = document.createElement("button");
      i.innerHTML = t, i.classList.add(a.BUTTON), i.setAttribute("aria-label", e), i.setAttribute("type", "button"), e === "Prev page" ? this.prevButton = i : e === "Next page" ? this.nextButton = i : this.buttons.push(i), this.paginationWrapper.append(i);
    });
    s(this, "updateButtonsAttrs", () => {
      this.currentPage === 1 ? this.makeDisable(this.prevButton) : this.makeEnable(this.prevButton), this.currentPage === this.totalPages ? this.makeDisable(this.nextButton) : this.makeEnable(this.nextButton), this.buttons.forEach((t, e) => {
        const i = this.buttonsMap[e];
        e + 1 === this.currentPage ? t.classList.add(a.CURRENT) : t.classList.remove(a.CURRENT), !i.visible || i.current ? this.makeDisable(t) : this.makeEnable(t), i.visible ? (t.classList.remove(a.EMPTY_PLACE), t.textContent = i.page) : (t.classList.add(a.EMPTY_PLACE), t.textContent = this.emptyMapInner), i.current ? t.classList.add(a.CURRENT) : t.classList.remove(a.CURRENT);
      });
    });
    s(this, "makeDisable", (t) => {
      t && (t.setAttribute("disabled", "true"), t.setAttribute("tabindex", "-1"));
    });
    s(this, "makeEnable", (t) => {
      t && (t.removeAttribute("disabled"), t.setAttribute("tabindex", "0"));
    });
    s(this, "update", () => {
      this.paginationWrapper.innerHTML = "", this.buttons = [], this.currentPage = 1, this.initVariables();
    });
    s(this, "goToCurrent", () => {
      var t, e;
      this.dynamicElements.forEach((i, n) => {
        Math.ceil((n + 1) / this.itemsPerPage) === this.currentPage ? (i.classList.remove(a.HIDDEN), i.removeAttribute("style"), i.removeAttribute("inert")) : (i.classList.add(a.HIDDEN), i.style.display = "none", i.setAttribute("inert", "true"));
      }), this.addPageParam(), this.addRelLinks(), (e = (t = this.on) == null ? void 0 : t.change) == null || e.call(t, this);
    });
    s(this, "addPageParam", () => {
      this.url = new URL(window.location.href), this.url.searchParams.set("page", this.currentPage.toString()), window.history.pushState({}, "", this.url.href);
    });
    s(this, "clickHandler", (t) => {
      const e = t.target.closest(".js--pagination-button");
      if (e && e.getAttribute("disabled") !== "true") {
        const i = e.getAttribute("aria-label");
        i === "Prev page" ? this.currentPage -= 1 : i === "Next page" ? this.currentPage += 1 : this.currentPage = +i.split(" ")[1], this.goToCurrent(), this.createButtonsMap(), this.updateButtonsAttrs();
      }
    });
    s(this, "addRelLinks", () => {
      if (document.head.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach((e) => e.remove()), this.currentPage > 1) {
        const e = document.createElement("link");
        e.setAttribute("rel", "prev"), e.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage - 1}`), document.head.append(e);
      }
      if (this.currentPage < this.totalPages) {
        const e = document.createElement("link");
        e.setAttribute("rel", "next"), e.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage + 1}`), document.head.append(e);
      }
    });
    this.component = typeof t == "string" ? document.querySelector(t) : t, this.paginationWrapperSelector = e, this.paginationWrapper = void 0, this.dynamicElementSelector = i, this.dynamicElements = [], this.previousButtonInner = n, this.nextButtonInner = r, this.itemsPerPage = l, this.url = new URL(window.location.href), this.currentPage = 1, this.totalPages = 1, this.buttons = [], this.prevButton = void 0, this.nextButton = void 0, this.buttonsMap = [], this.emptyMapInner = "...", this.hiddenButtons = u, this.on = c, this.init();
  }
}
export {
  m as Pagination
};
