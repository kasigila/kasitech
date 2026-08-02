import { exportProposalPdf } from "../export-a4";

exportProposalPdf({
  srcDir: "proposals/credo-website-contract",
  outPdfName: "KasiTech_Credo_Website_Agreement.pdf",
  aliasPdfName: "Credo_Website_Agreement.pdf",
  publicFolderName: "credo-website-contract",
  manifestName: "credo-website-contract-manifest.json",
  meta: {
    title: "Website Service Agreement · Credo Energy Group | KasiTech",
    ref: "KT-CEG-WEB-AGR-2026-001",
    date: "2026-08-03",
    oneTimeTsh: 4_800_000,
    careMonthlyTsh: 150_000,
    relatedProposal: "KT-CEG-WEB-2026-001",
    editableSource: "proposals/credo-website-contract/",
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
