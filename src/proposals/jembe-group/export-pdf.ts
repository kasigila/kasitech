import { exportProposalPdf } from "../export-a4";
import {
  JEMBE_CARE,
  JEMBE_DATE_ISO,
  JEMBE_ONE_TIME_TSH,
  JEMBE_PREVIEW_URL,
  JEMBE_PROPOSAL_REF,
} from "./commercial";

exportProposalPdf({
  srcDir: "proposals/jembe-group",
  outPdfName: "KasiTech_Jembe_Group_Website_Proposal.pdf",
  aliasPdfName: "Jembe_Group_Website_Proposal.pdf",
  publicFolderName: "jembe-group",
  manifestName: "jembe-group-manifest.json",
  meta: {
    title: "Website Proposal · Jembe Group LLC | KasiTech",
    ref: JEMBE_PROPOSAL_REF,
    date: JEMBE_DATE_ISO,
    oneTimeTsh: JEMBE_ONE_TIME_TSH,
    careMonthlyTsh: JEMBE_CARE.amountTsh,
    demoStudio: JEMBE_PREVIEW_URL,
    editableSource: "proposals/jembe-group/",
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
