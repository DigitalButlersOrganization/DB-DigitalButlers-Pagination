var B = Object.defineProperty;
var f = (o, t, i) => t in o ? B(o, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : o[t] = i;
var s = (o, t, i) => (f(o, typeof t != "symbol" ? t + "" : t, i), i);
const r = "js--", u = {
  ACTIVE: `${r}active`,
  UNACTIVE: `${r}unactive`,
  VISIBLE: `${r}visible`,
  BUTTON: `${r}pagination-button`,
  CURRENT: `${r}pagination-current`,
  EMPTY_PLACE: `${r}pagination-empty-place`,
  HIDDEN: `${r}hidden-by-pagination`
};
class A {
  constructor(t = '[data-pagination="wrapper"]', { paginationWrapperSelector: i = '[data-pagination="container"]', dynamicElementSelector: e = '.w-dyn-item[role="listitem"]', previousButtonInner: a = "Prev", nextButtonInner: n = "Next", previousButtonClassnames: l = [], nextButtonClassnames: h = [], regularButtonClassnames: p = [], itemsPerPage: c, emptyMapInner: d = "...", pageNumberTransformer: g = (b) => b.toString(), hiddenButtons: m = {
    min: 6
  }, on: E = {}, devMode: P = !1 }) {
    s(this, "component");
    s(this, "paginationWrapperSelector");
    s(this, "paginationWrapper");
    s(this, "dynamicElementSelector");
    s(this, "dynamicElements");
    s(this, "openedElements");
    s(this, "previousButtonInner");
    s(this, "nextButtonInner");
    s(this, "itemsPerPage");
    s(this, "previousButtonClassnames");
    s(this, "nextButtonClassnames");
    s(this, "regularButtonClassnames");
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
    s(this, "pageNumberTransformer");
    s(this, "devMode");
    s(this, "on");
    s(this, "init", () => {
      var i, e, a;
      !this.devMode && window.location.protocol === "http:" && Boolean(window.location.port) && console.warn("PAGINATION DEV MODE: Use option {devMode: true} for debugging. Read the docs https://www.npmjs.com/package/@digital-butlers/pagination | \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0438\u0306\u0442\u0435 \u043E\u043F\u0446\u0438\u044E {devMode: true} \u0434\u043B\u044F \u043E\u0442\u043B\u0430\u0434\u043A\u0438. \u0427\u0438\u0442\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E https://www.npmjs.com/package/@digital-butlers/pagination"), this.devMode && console.warn("PAGINATION DEV MODE: Pagination dev mode enabled! Read the docs https://www.npmjs.com/package/@digital-butlers/pagination | \u0412 \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430! \u0427\u0438\u0442\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E https://www.npmjs.com/package/@digital-butlers/pagination");
      const t = this.url.searchParams.get("page");
      this.currentPage = t ? +t : 1, this.paginationWrapper = (i = this.component.querySelector(this.paginationWrapperSelector)) != null ? i : void 0, this.paginationWrapper ? (this.initVariables(), this.paginationWrapper.addEventListener("click", this.clickHandler)) : this.devMode && console.warn("PAGINATION DEV MODE: Pagination wrapper not found | \u041E\u0431\u0435\u0440\u0442\u043A\u0430 \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"), (a = (e = this.on) == null ? void 0 : e.afterInit) == null || a.call(e, this);
    });
    s(this, "initVariables", () => {
      this.dynamicElements = Array.from(this.component.querySelectorAll(this.dynamicElementSelector)), this.totalPages = Math.ceil(this.dynamicElements.length / this.itemsPerPage), this.createButtonsMap(), this.addCustomButtons(), this.goToCurrent();
    });
    s(this, "createButtonsMap", () => {
      const t = [], i = new Array(this.totalPages).fill("").map((a, n) => n + 1), e = (a) => a === 1 || a === this.totalPages || a >= this.currentPage - 1 && a <= this.currentPage + 1;
      i.forEach((a, n) => {
        const l = {
          page: a,
          current: n + 1 === this.currentPage
        };
        e(a) || this.buttons.length < this.hiddenButtons.min ? t.push({
          ...l,
          visible: !0
        }) : e(i[n + 1]) && e(i[n - 1]) ? t.push({
          ...l,
          visible: !0
        }) : t.push({
          ...l,
          visible: !1
        });
      }), this.buttonsMap = t;
    });
    s(this, "addCustomButtons", () => {
      this.totalPages > 1 ? (this.paginationWrapper.classList.remove(u.UNACTIVE), this.addButton({
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
      })) : this.paginationWrapper.classList.add(u.UNACTIVE), this.createButtonsMap(), this.updateButtonsAttrs(), this.addRelLinks();
    });
    s(this, "addButton", ({ content: t, label: i }) => {
      const e = document.createElement("button");
      typeof t == "string" ? e.innerHTML = t : t instanceof Node && e.append(t), e.classList.add(u.BUTTON), e.setAttribute("aria-label", i), e.setAttribute("type", "button"), i === "Prev page" ? (e.classList.add(...this.previousButtonClassnames), this.prevButton = e) : i === "Next page" ? (e.classList.add(...this.nextButtonClassnames), this.nextButton = e) : (e.classList.add(...this.regularButtonClassnames), this.buttons.push(e)), this.paginationWrapper.append(e);
    });
    s(this, "updateButtonsAttrs", () => {
      this.currentPage === 1 ? this.makeDisable(this.prevButton) : this.makeEnable(this.prevButton), this.currentPage === this.totalPages ? this.makeDisable(this.nextButton) : this.makeEnable(this.nextButton), this.buttons.forEach((t, i) => {
        const e = this.buttonsMap[i];
        i + 1 === this.currentPage ? t.classList.add(u.CURRENT) : t.classList.remove(u.CURRENT), !e.visible || e.current ? this.makeDisable(t) : this.makeEnable(t), e.visible ? (t.classList.remove(u.EMPTY_PLACE), t.textContent = this.pageNumberTransformer(e.page)) : (t.classList.add(u.EMPTY_PLACE), t.textContent = this.emptyMapInner), e.current ? t.classList.add(u.CURRENT) : t.classList.remove(u.CURRENT);
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
      var t, i;
      this.openedElements = [], this.dynamicElements.forEach((e, a) => {
        Math.ceil((a + 1) / this.itemsPerPage) === this.currentPage ? (e.classList.remove(u.HIDDEN), e.removeAttribute("style"), e.removeAttribute("inert"), this.openedElements.push(e)) : (e.classList.add(u.HIDDEN), e.style.display = "none", e.setAttribute("inert", "true"));
      }), this.addPageParam(), this.addRelLinks(), (i = (t = this.on) == null ? void 0 : t.change) == null || i.call(t, this);
    });
    s(this, "addPageParam", () => {
      this.url = new URL(window.location.href), this.url.searchParams.set("page", this.currentPage.toString()), window.history.pushState({}, "", this.url.href);
    });
    s(this, "clickHandler", (t) => {
      var e, a;
      const i = t.target.closest(".js--pagination-button");
      if (i && i.getAttribute("disabled") !== "true") {
        const n = i.getAttribute("aria-label");
        n === "Prev page" ? this.currentPage -= 1 : n === "Next page" ? this.currentPage += 1 : this.currentPage = +n.split(" ")[1], this.goToCurrent(), this.createButtonsMap(), this.updateButtonsAttrs(), (a = (e = this.on) == null ? void 0 : e.click) == null || a.call(e, this);
      }
    });
    s(this, "addRelLinks", () => {
      if (document.head.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach((i) => i.remove()), this.currentPage > 1) {
        const i = document.createElement("link");
        i.setAttribute("rel", "prev"), i.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage - 1}`), document.head.append(i);
      }
      if (this.currentPage < this.totalPages) {
        const i = document.createElement("link");
        i.setAttribute("rel", "next"), i.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage + 1}`), document.head.append(i);
      }
    });
    this.component = typeof t == "string" ? document.querySelector(t) : t, this.paginationWrapperSelector = i, this.paginationWrapper = void 0, this.dynamicElementSelector = e, this.dynamicElements = [], this.openedElements = [], this.previousButtonInner = a, this.nextButtonInner = n, this.itemsPerPage = c, this.url = new URL(window.location.href), this.currentPage = 1, this.totalPages = 1, this.buttons = [], this.prevButton = void 0, this.nextButton = void 0, this.buttonsMap = [], this.emptyMapInner = d, this.hiddenButtons = m, this.pageNumberTransformer = g, this.on = E, this.previousButtonClassnames = l, this.nextButtonClassnames = h, this.regularButtonClassnames = p, this.devMode = P, this.init();
  }
}
export {
  A as Pagination
};
