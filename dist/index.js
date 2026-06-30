var B = Object.defineProperty;
var f = (o, e, t) => e in o ? B(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var i = (o, e, t) => (f(o, typeof e != "symbol" ? e + "" : e, t), t);
const h = "js--", n = {
  ACTIVE: `${h}active`,
  UNACTIVE: `${h}unactive`,
  VISIBLE: `${h}visible`,
  BUTTON: `${h}pagination-button`,
  CURRENT: `${h}pagination-current`,
  EMPTY_PLACE: `${h}pagination-empty-place`,
  HIDDEN: `${h}hidden-by-pagination`
};
const A = { itemsPerPage: 0 }, C = (o) => {
  const { serverMode: e, totalPages: t } = o;
  return e && typeof e == "object" && typeof e.totalPages == "number" ? { isServerModeEnabled: !0, serverMode: e } : e === !0 && typeof t == "number" ? { isServerModeEnabled: !0, serverMode: { totalPages: t } } : { isServerModeEnabled: !1, serverMode: void 0 };
};
class y {
  constructor(e = '[data-pagination="wrapper"]', t = A) {
    i(this, "component");
    i(this, "paginationWrapperSelector");
    i(this, "paginationWrapper");
    i(this, "dynamicElementSelector");
    i(this, "dynamicElements");
    i(this, "openedElements");
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
    i(this, "pageNumberTransformer");
    i(this, "devMode");
    i(this, "isServerModeEnabled");
    i(this, "serverMode");
    i(this, "on");
    i(this, "init", () => {
      var t, s, a;
      !this.devMode && window.location.protocol === "http:" && Boolean(window.location.port) && console.warn("PAGINATION DEV MODE: Use option {devMode: true} for debugging. Read the docs https://www.npmjs.com/package/@digital-butlers/pagination | \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0438\u0306\u0442\u0435 \u043E\u043F\u0446\u0438\u044E {devMode: true} \u0434\u043B\u044F \u043E\u0442\u043B\u0430\u0434\u043A\u0438. \u0427\u0438\u0442\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E https://www.npmjs.com/package/@digital-butlers/pagination"), this.devMode && console.warn("PAGINATION DEV MODE: Pagination dev mode enabled! Read the docs https://www.npmjs.com/package/@digital-butlers/pagination | \u0412 \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430! \u0427\u0438\u0442\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E https://www.npmjs.com/package/@digital-butlers/pagination"), this.devMode && this.isServerModeEnabled && !this.serverMode && console.warn("PAGINATION DEV MODE: serverMode is enabled but totalPages is missing. Pass serverMode: { totalPages: number } | serverMode \u0432\u043A\u043B\u044E\u0447\u0435\u043D, \u043D\u043E totalPages \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D");
      const e = this.url.searchParams.get("page");
      this.currentPage = e ? +e : 1, this.paginationWrapper = (t = this.component.querySelector(this.paginationWrapperSelector)) != null ? t : void 0, this.paginationWrapper ? (this.initVariables(), this.paginationWrapper.addEventListener("click", this.clickHandler)) : this.devMode && console.warn("PAGINATION DEV MODE: Pagination wrapper not found | \u041E\u0431\u0435\u0440\u0442\u043A\u0430 \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"), (a = (s = this.on) == null ? void 0 : s.afterInit) == null || a.call(s, this);
    });
    i(this, "initVariables", () => {
      var e, t;
      this.isServerModeEnabled ? this.totalPages = (t = (e = this.serverMode) == null ? void 0 : e.totalPages) != null ? t : 0 : (this.dynamicElements = Array.from(this.component.querySelectorAll(this.dynamicElementSelector)), this.totalPages = Math.ceil(this.dynamicElements.length / this.itemsPerPage)), this.createButtonsMap(), this.addCustomButtons(), this.goToCurrent();
    });
    i(this, "createButtonsMap", () => {
      var u;
      const e = this.serverMode ? (u = this.serverMode) == null ? void 0 : u.totalPages : this.totalPages, t = [], s = new Array(e).fill("").map((r, l) => l + 1), a = (r) => r === 1 || r === e || r >= this.currentPage - 1 && r <= this.currentPage + 1;
      s.forEach((r, l) => {
        const d = {
          page: r,
          current: l + 1 === this.currentPage
        };
        a(r) || this.buttons.length < this.hiddenButtons.min ? t.push({
          ...d,
          visible: !0
        }) : a(s[l + 1]) && a(s[l - 1]) ? t.push({
          ...d,
          visible: !0
        }) : t.push({
          ...d,
          visible: !1
        });
      }), this.buttonsMap = t;
    });
    i(this, "addCustomButtons", () => {
      this.totalPages > 1 ? (this.paginationWrapper.classList.remove(n.UNACTIVE), this.addButton({
        label: "Prev page",
        content: this.previousButtonInner
      }), this.buttonsMap.forEach(({ page: e }) => {
        this.addButton({
          label: `Page ${e}`,
          content: e
        });
      }), this.addButton({
        label: "Next page",
        content: this.nextButtonInner
      })) : this.paginationWrapper.classList.add(n.UNACTIVE), this.createButtonsMap(), this.updateButtonsAttrs(), this.addRelLinks();
    });
    i(this, "addButton", ({ content: e, label: t }) => {
      const s = document.createElement("button");
      typeof e == "string" ? s.innerHTML = e : e instanceof Node && s.append(e), s.classList.add(n.BUTTON), s.setAttribute("aria-label", t), s.setAttribute("type", "button"), t === "Prev page" ? (s.classList.add(...this.previousButtonClassnames), this.prevButton = s) : t === "Next page" ? (s.classList.add(...this.nextButtonClassnames), this.nextButton = s) : (s.classList.add(...this.regularButtonClassnames), this.buttons.push(s)), this.paginationWrapper.append(s);
    });
    i(this, "updateButtonsAttrs", () => {
      this.currentPage === 1 ? this.makeDisable(this.prevButton) : this.makeEnable(this.prevButton), this.currentPage === this.totalPages ? this.makeDisable(this.nextButton) : this.makeEnable(this.nextButton), this.buttons.forEach((e, t) => {
        const s = this.buttonsMap[t];
        t + 1 === this.currentPage ? e.classList.add(n.CURRENT) : e.classList.remove(n.CURRENT), !s.visible || s.current ? this.makeDisable(e) : this.makeEnable(e), s.visible ? (e.classList.remove(n.EMPTY_PLACE), e.textContent = this.pageNumberTransformer(s.page)) : (e.classList.add(n.EMPTY_PLACE), e.textContent = this.emptyMapInner), s.current ? e.classList.add(n.CURRENT) : e.classList.remove(n.CURRENT);
      });
    });
    i(this, "makeDisable", (e) => {
      e && (e.setAttribute("disabled", "true"), e.setAttribute("tabindex", "-1"));
    });
    i(this, "makeEnable", (e) => {
      e && (e.removeAttribute("disabled"), e.setAttribute("tabindex", "0"));
    });
    i(this, "update", () => {
      this.paginationWrapper.innerHTML = "", this.buttons = [], this.currentPage = 1, this.initVariables();
    });
    i(this, "goToCurrent", () => {
      var e, t;
      this.isServerModeEnabled || (this.openedElements = [], this.dynamicElements.forEach((s, a) => {
        Math.ceil((a + 1) / this.itemsPerPage) === this.currentPage ? (s.classList.remove(n.HIDDEN), s.removeAttribute("style"), s.removeAttribute("inert"), this.openedElements.push(s)) : (s.classList.add(n.HIDDEN), s.style.display = "none", s.setAttribute("inert", "true"));
      })), this.addPageParam(), this.addRelLinks(), (t = (e = this.on) == null ? void 0 : e.change) == null || t.call(e, this);
    });
    i(this, "addPageParam", () => {
      this.url = new URL(window.location.href), this.url.searchParams.set("page", this.currentPage.toString()), window.history.pushState({}, "", this.url.href);
    });
    i(this, "clickHandler", (e) => {
      var s, a;
      const t = e.target.closest(".js--pagination-button");
      if (t && t.getAttribute("disabled") !== "true") {
        const u = t.getAttribute("aria-label");
        u === "Prev page" ? this.currentPage -= 1 : u === "Next page" ? this.currentPage += 1 : this.currentPage = +u.split(" ")[1], this.goToCurrent(), this.createButtonsMap(), this.updateButtonsAttrs(), (a = (s = this.on) == null ? void 0 : s.click) == null || a.call(s, this);
      }
    });
    i(this, "addRelLinks", () => {
      if (document.head.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach((t) => t.remove()), this.currentPage > 1) {
        const t = document.createElement("link");
        t.setAttribute("rel", "prev"), t.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage - 1}`), document.head.append(t);
      }
      if (this.currentPage < this.totalPages) {
        const t = document.createElement("link");
        t.setAttribute("rel", "next"), t.setAttribute("href", `${this.url.origin + this.url.pathname}?page=${this.currentPage + 1}`), document.head.append(t);
      }
    });
    const { paginationWrapperSelector: s = '[data-pagination="container"]', dynamicElementSelector: a = '.w-dyn-item[role="listitem"]', previousButtonInner: u = "Prev", nextButtonInner: r = "Next", previousButtonClassnames: l = [], nextButtonClassnames: d = [], regularButtonClassnames: c = [], itemsPerPage: g = 0, emptyMapInner: m = "...", pageNumberTransformer: v = (M) => M.toString(), hiddenButtons: E = {
      min: 6
    }, on: P = {}, devMode: b = !1 } = t, p = C(t);
    this.component = typeof e == "string" ? document.querySelector(e) : e, this.paginationWrapperSelector = s, this.paginationWrapper = void 0, this.dynamicElementSelector = a, this.dynamicElements = [], this.openedElements = [], this.previousButtonInner = u, this.nextButtonInner = r, this.itemsPerPage = g, this.isServerModeEnabled = p.isServerModeEnabled, this.serverMode = p.serverMode, this.url = new URL(window.location.href), this.currentPage = 1, this.totalPages = 1, this.buttons = [], this.prevButton = void 0, this.nextButton = void 0, this.buttonsMap = [], this.emptyMapInner = m, this.hiddenButtons = E, this.pageNumberTransformer = v, this.on = P, this.previousButtonClassnames = l, this.nextButtonClassnames = d, this.regularButtonClassnames = c, this.devMode = b, this.init();
  }
}
export {
  y as Pagination
};
