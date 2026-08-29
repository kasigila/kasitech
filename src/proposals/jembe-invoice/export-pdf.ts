import { exportProposalPdf } from "../export-a4";
import {
  JEMBE_CARE,
  JEMBE_COMMENCEMENT_TSH,
  JEMBE_DATE_ISO,
  JEMBE_INVOICE_REF,
  JEMBE_ONE_TIME_TSH,
  JEMBE_PROPOSAL_REF,
} from "../jembe-group/commercial";

exportProposalPdf({
  srcDir: "proposals/jembe-invoice",
  outPdfName: "KasiTech_Jembe_Group_Commencement_Invoice.pdf",
  aliasPdfName: "Jembe_Group_Invoice.pdf",
  publicFolderName: "jembe-invoice",
  manifestName: "jembe-invoice-manifest.json",
  meta: {
    title: "Commencement Invoice · Jembe Group LLC | KasiTech",
    ref: JEMBE_INVOICE_REF,
    relatedProposal: JEMBE_PROPOSAL_REF,
    date: JEMBE_DATE_ISO,
    oneTimeTsh: JEMBE_ONE_TIME_TSH,
    amountDueTsh: JEMBE_COMMENCEMENT_TSH,
    careMonthlyTsh: JEMBE_CARE.amountTsh,
    editableSource: "proposals/jembe-invoice/",
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
