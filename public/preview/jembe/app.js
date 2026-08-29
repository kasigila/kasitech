(() => {
  const pages = [...document.querySelectorAll(".page")];
  const titles = Object.fromEntries(pages.map((p) => [p.id.replace("page-", ""), p.dataset.title]));
  const drawer = document.getElementById("drawer");
  const search = document.getElementById("search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  /** Mandate form deliveries go to the group desk via FormSubmit. */
  const MANDATE_TO = "info@jembegroupllc.com";

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

  function go(id, opts = {}) {
    const key = INDEX.some((i) => i.id === id) ? id : "home";
    pages.forEach((p) => p.classList.toggle("active", p.id === `page-${key}`));
    document.querySelectorAll(".nav-item > button").forEach((b) => {
      b.classList.toggle("on", b.dataset.go === key);
    });
    document.title = titles[key] || "Jembe Group LLC · www.jembegroupllc.com";
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
      history.replaceState({ page: key }, "", `#${key}`);
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

  const form = document.getElementById("mandate-form");
  const done = document.getElementById("mandate-done");
  const mandateError = document.getElementById("mandate-error");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const org = String(fd.get("org") || "").trim();
    const contact = String(fd.get("contact") || "").trim();
    const counterpart = String(fd.get("counterpart") || "").trim();
    const sector = String(fd.get("sector") || "").trim();
    const notes = String(fd.get("notes") || "").trim();

    const previousLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    if (mandateError) mandateError.hidden = true;

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(MANDATE_TO)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            organisation: org,
            contact,
            counterpart,
            sector,
            notes: notes || "-",
            message: [
              `Counterpart: ${counterpart}`,
              `Sector: ${sector}`,
              `Organisation: ${org}`,
              `Contact: ${contact}`,
              "",
              notes || "(no notes)",
            ].join("\n"),
            _subject: `Jembe Group LLC mandate · ${sector} · ${org}`,
            _template: "table",
            _captcha: "false",
            _replyto: contact.includes("@") ? contact : undefined,
            _url: "https://www.jembegroupllc.com",
          }),
        },
      );

      const data = await res.json().catch(() => null);
      const ok =
        res.ok &&
        (data?.success === true ||
          data?.success === "true" ||
          data?.success === undefined);

      if (!ok) throw new Error(data?.message || "FormSubmit rejected the post");

      form.hidden = true;
      done.hidden = false;
      if (mandateError) mandateError.hidden = true;
    } catch {
      form.hidden = true;
      done.hidden = false;
      if (mandateError) mandateError.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = previousLabel;
    }
  });

  document.getElementById("mandate-again").addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    done.hidden = true;
    if (mandateError) mandateError.hidden = true;
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
  go(hash || "home", { skipHash: !hash });
})();
