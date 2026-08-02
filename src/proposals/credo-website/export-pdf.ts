import { exportProposalPdf } from "../export-a4";

exportProposalPdf({
  srcDir: "proposals/credo-website",
  outPdfName: "KasiTech_Credo_Website_Proposal.pdf",
  aliasPdfName: "Credo_Website_Proposal.pdf",
  publicFolderName: "credo-website",
  manifestName: "credo-website-manifest.json",
  meta: {
    title: "Website Proposal — Credo Energy Group | KasiTech",
    ref: "KT-CEG-WEB-2026-001",
    date: "2026-08-03",
    oneTimeTsh: 4_800_000,
    careMonthlyTsh: 150_000,
    demoStudio:
      "https://www.kasitechinnovations.com/demo-studio/proposal/credo-energy-group?section=recommended-website",
    editableSource: "proposals/credo-website/",
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
