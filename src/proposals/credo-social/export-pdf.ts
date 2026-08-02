import { exportProposalPdf } from "../export-a4";

exportProposalPdf({
  srcDir: "proposals/credo-social-media",
  outPdfName: "KasiTech_Credo_Social_Media_Proposal.pdf",
  aliasPdfName: "Credo_Social_Media_Proposal.pdf",
  publicFolderName: "credo-social-media",
  manifestName: "credo-social-manifest.json",
  meta: {
    title: "Social Media Proposal — Credo Energy Group | KasiTech",
    ref: "KT-CEG-SOC-2026-001",
    date: "2026-08-02",
    socialMonthlyTsh: 1_000_000,
    planCode: "SOC-PRO",
    editableSource: "proposals/credo-social-media/",
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
