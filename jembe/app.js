(() => {
  const pages = [...document.querySelectorAll(".page")];
  const titles = Object.fromEntries(pages.map((p) => [p.id.replace("page-", ""), p.dataset.title]));
  const drawer = document.getElementById("drawer");
  const search = document.getElementById("search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const cfg = window.JEMBE_CONFIG || {};

  const INDEX = [
    { id: "home", title: "Home", blurb: "Corporate profile cover · five sectors" },
    { id: "about", title: "The Group", blurb: "Mauritius-incorporated advisory and investing group" },
    { id: "sectors", title: "Five sectors", blurb: "Energy, infrastructure, insurance, agribusiness, mining" },
    { id: "sector-energy", title: "Energy", blurb: "IPPs, PPAs, renewables, DFI engagement" },
    { id: "sector-infra", title: "Infrastructure", blurb: "PPP, water, transport, bankable feasibility" },
    { id: "sector-insurance", title: "Insurance & Risk", blurb: "Placement, medical schemes, project risk" },
    { id: "sector-agri", title: "Agribusiness", blurb: "Estates, processing, commodity off-take" },
    { id: "sector-mining", title: "Mining & Minerals", blurb: "Due diligence, plants, mineral trading" },
    { id: "portfolio", title: "Energy portfolio", blurb: "Shinyanga 50 MW, Bukombe 5 MW, substations" },
    { id: "delivery", title: "Delivery · BQ Contractors", blurb: "EPC, water, industrial, hospital works" },
    { id: "network", title: "Network", blurb: "Infinity Star, Ndege, CreditInvest, BQ" },
    { id: "track", title: "Track record", blurb: "Selected engagements across five sectors" },
    { id: "offices", title: "Offices", blurb: "Mauritius, Nairobi, Dar es Salaam, Kampala, Kigali" },
    { id: "resources", title: "Resources", blurb: "Corporate profile and sector notes" },
    { id: "careers", title: "Careers", blurb: "Teams assembled around mandates" },
    { id: "mandate", title: "Begin a mandate", blurb: "Segmented desk for sponsors, governments, DFIs" },
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
    const hits = INDEX.filter(
      (i) => !query || i.title.toLowerCase().includes(query) || i.blurb.toLowerCase().includes(query),
    ).slice(0, 8);
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
    };
  }

  async function postMandate(payload) {
    const body = {
      ...payload,
      _subject: `Jembe Group mandate: ${payload.sector} — ${payload.organisation}`,
    };
    if (cfg.formAccessKey) body.access_key = cfg.formAccessKey;

    const res = await fetch(cfg.formEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Form service responded ${res.status}`);
    }
  }

  function mailtoMandate(payload) {
    const email = cfg.mandateEmail || "info@jembegroup.com";
    const subject = encodeURIComponent(`Mandate enquiry: ${payload.sector} — ${payload.organisation}`);
    const lines = [
      `Counterpart: ${payload.counterpart}`,
      `Sector: ${payload.sector}`,
      `Name: ${payload.name}`,
      `Organisation: ${payload.organisation}`,
      `Contact: ${payload.contact}`,
      "",
      payload.notes || "",
    ];
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showError("");
    const payload = payloadFromForm();
    submitBtn.disabled = true;
    try {
      if (cfg.formEndpoint) {
        await postMandate(payload);
        showDone(
          "The desk has the file.",
          "Thank you. Your counterpart type and sector travel with the note so the right entity in the network can respond.",
        );
      } else {
        mailtoMandate(payload);
        showDone(
          "Open your email client to send.",
          "A message to the group desk has been prepared in your email client. Send it to complete the request. To receive submissions in the browser instead, set JEMBE_FORM_ENDPOINT on the host.",
        );
      }
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
