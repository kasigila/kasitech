import { exportProposalPdf } from "../export-a4";

exportProposalPdf({
  srcDir: "proposals/credo-social-contract",
  outPdfName: "KasiTech_Credo_Social_Media_Agreement.pdf",
  aliasPdfName: "Credo_Social_Media_Agreement.pdf",
  publicFolderName: "credo-social-contract",
  manifestName: "credo-social-contract-manifest.json",
  meta: {
    title: "Social Media Service Agreement · Credo Energy Group | KasiTech",
    ref: "KT-CEG-SOC-AGR-2026-001",
    date: "2026-08-03",
    socialMonthlyTsh: 1_000_000,
    relatedProposal: "KT-CEG-SOC-2026-001",
    editableSource: "proposals/credo-social-contract/",
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
