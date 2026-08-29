(() => {
  const pages = [...document.querySelectorAll(".page")];
  const titles = Object.fromEntries(pages.map((p) => [p.id.replace("page-", ""), p.dataset.title]));
  const drawer = document.getElementById("drawer");
  const search = document.getElementById("search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const cfg = window.JEMBE_CONFIG || {};

  const INDEX = [
    { id: "home", title: "Home", blurb: "Corporate profile cover · five sectors", terms: "jembe advisory investment mauritius" },
    { id: "about", title: "The Group", blurb: "Mauritius-incorporated advisory and investing group", terms: "eben incorporation east africa" },
    { id: "sectors", title: "Five sectors", blurb: "Energy, infrastructure, insurance, agribusiness, mining", terms: "practice platform" },
    { id: "sector-energy", title: "Energy", blurb: "IPPs, PPAs, renewables, DFI engagement", terms: "solar hydro gas generation transmission tanesco" },
    { id: "sector-infra", title: "Infrastructure", blurb: "PPP, water, transport, bankable feasibility", terms: "roads ports logistics water backbone" },
    { id: "sector-insurance", title: "Insurance & Risk", blurb: "Placement, medical schemes, project risk", terms: "ndege brokerage claims" },
    { id: "sector-agri", title: "Agribusiness", blurb: "Estates, processing, commodity off-take", terms: "sisal estate fibre" },
    { id: "sector-mining", title: "Mining & Minerals", blurb: "Due diligence, plants, mineral trading", terms: "gold tarime processing" },
    { id: "portfolio", title: "Energy portfolio", blurb: "Shinyanga 50 MW, Bukombe 5 MW, substations", terms: "solar tanesco shinyanga bukombe kinyerezi chalinze grid" },
    { id: "delivery", title: "Delivery · BQ Contractors", blurb: "EPC, water, industrial, hospital works", terms: "piping marine tanks arusha" },
    { id: "network", title: "Network", blurb: "Infinity Star, Ndege, CreditInvest, BQ", terms: "mbegu next bridge" },
    { id: "track", title: "Track record", blurb: "Selected engagements across five sectors", terms: "sisal water medical gold solar" },
    { id: "offices", title: "Offices", blurb: "Mauritius, Nairobi, Dar es Salaam, Kampala, Kigali", terms: "eben westlands samora" },
    { id: "resources", title: "Resources", blurb: "Corporate profile and sector notes", terms: "downloads profile" },
    { id: "careers", title: "Careers", blurb: "Teams assembled around mandates", terms: "roles interest" },
    { id: "mandate", title: "Begin a mandate", blurb: "Segmented desk for sponsors, governments, DFIs", terms: "contact form instruct" },
  ];

  function knownPage(id) {
    return INDEX.some((i) => i.id === id);
  }

  function go(id, opts = {}) {
    const key = knownPage(id) ? id : "home";
    pages.forEach((p) => p.classList.toggle("active", p.id === `page-${key}`));
    document.querySelectorAll(".nav-item > button").forEach((b) => {
      b.classList.toggle("on", b.dataset.go === key);
    });
    document.title = titles[key] || "Jembe Group LLC";
    if (opts.sector) {
      const sel = document.getElementById("sector");
      if (sel) {
        const match = [...sel.options].find((o) => o.value === opts.sector);
        if (match) sel.value = opts.sector;
      }
    }
    closeDrawer();
    closeSearch();
    if (!opts.skipHash) {
      const next = key === "home" ? "/" : `/#${key}`;
      history.replaceState({ page: key }, "", next);
    }
    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
    observeReveal();
  }

  function openDrawer() {
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add("open"));
    document.body.classList.add("nav-open");
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    document.body.classList.remove("nav-open");
    setTimeout(() => {
      if (!drawer.classList.contains("open")) drawer.hidden = true;
    }, 320);
  }
  function openSearch() {
    search.classList.add("open");
    searchInput.focus();
    renderSearch("");
  }
  function closeSearch() {
    search.classList.remove("open");
    searchInput.value = "";
  }

  function renderSearch(q) {
    const query = q.trim().toLowerCase();
    const hits = INDEX.filter((i) => {
      if (!query) return true;
      const hay = `${i.title} ${i.blurb} ${i.terms || ""}`.toLowerCase();
      return hay.includes(query);
    }).slice(0, 8);
    searchResults.innerHTML = hits
      .map(
        (h) =>
          `<button type="button" data-go="${h.id}"><strong>${h.title}</strong><span>${h.blurb}</span></button>`,
      )
      .join("");
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (!t) return;
    e.preventDefault();
    go(t.dataset.go, { sector: t.dataset.sector });
  });

  document.getElementById("menu-open").addEventListener("click", openDrawer);
  document.getElementById("menu-close").addEventListener("click", closeDrawer);
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });
  document.getElementById("search-open").addEventListener("click", openSearch);
  document.getElementById("search-close").addEventListener("click", closeSearch);
  search.addEventListener("click", (e) => {
    if (e.target === search) closeSearch();
  });
  searchInput.addEventListener("input", () => renderSearch(searchInput.value));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      closeSearch();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearch();
    }
  });

  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    if (id) go(id, { skipHash: true });
  });

  const form = document.getElementById("mandate-form");
  const done = document.getElementById("mandate-done");
  const doneTitle = document.getElementById("mandate-done-title");
  const doneCopy = document.getElementById("mandate-done-copy");
  const errorEl = document.getElementById("mandate-error");
  const submitBtn = document.getElementById("mandate-submit");

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = !message;
  }

  function showDone(title, copy) {
    if (doneTitle) doneTitle.textContent = title;
    if (doneCopy) doneCopy.textContent = copy;
    form.hidden = true;
    done.hidden = false;
  }

  function payloadFromForm() {
    const data = Object.fromEntries(new FormData(form).entries());
    return {
      counterpart: data.counterpart || "",
      sector: data.sector || "",
      name: data.name || "",
      organisation: data.org || "",
      contact: data.contact || "",
      notes: data.notes || "",
      company_website: data.company_website || "",
    };
  }

  async function postJson(url, payload, extra = {}) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, ...extra }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || data?.ok === false) {
      throw new Error(data?.error || `Form service responded ${res.status}`);
    }
  }

  async function postMandate(payload) {
    const api = cfg.mandateApi || "/api/mandate";
    try {
      await postJson(api, payload);
      return;
    } catch (apiErr) {
      if (cfg.formEndpoint) {
        const extra = {
          _subject: `Jembe Group mandate: ${payload.sector} — ${payload.organisation}`,
        };
        if (cfg.formAccessKey) extra.access_key = cfg.formAccessKey;
        await postJson(cfg.formEndpoint, payload, extra);
        return;
      }
      const email = cfg.mandateEmail || "info@jembegroup.com";
      await postJson(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, payload, {
        _subject: `Jembe Group mandate: ${payload.sector} — ${payload.organisation}`,
        _template: "table",
        _captcha: "false",
        _url: cfg.siteOrigin || "https://jembegroupllc.com",
      });
      void apiErr;
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showError("");
    const payload = payloadFromForm();
    if (payload.company_website) {
      showDone("The desk has the file.", "Thank you.");
      return;
    }
    submitBtn.disabled = true;
    try {
      await postMandate(payload);
      showDone(
        "The desk has the file.",
        "Thank you. Your counterpart type and sector travel with the note so the right entity in the network can respond.",
      );
    } catch (err) {
      showError("The mandate could not be sent. Please email info@jembegroup.com or try again.");
      console.error(err);
    } finally {
      submitBtn.disabled = false;
    }
  });
  document.getElementById("mandate-again").addEventListener("click", () => {
    form.reset();
    showError("");
    form.hidden = false;
    done.hidden = true;
  });

  function observeReveal() {
    const els = document.querySelectorAll(".page.active .reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
  }

  const hash = location.hash.replace("#", "");
  const path = location.pathname.replace(/^\/+|\/+$/g, "");
  const initial = knownPage(hash) ? hash : knownPage(path) ? path : "home";
  go(initial, { skipHash: initial === "home" && !hash && !path });
})();
