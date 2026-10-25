import type { Photo } from "./models";
/** Neutral UI placeholder only: no generated artwork and no unreviewed photo. */
export function neutralPhoto(subject: string): Photo {
  return {
    kind: "placeholder",
    url: null,
    altText: `No reviewed photograph available for ${subject}`,
    caption: "Photo awaiting rights and subject review",
    sourceDescription:
      "Neutral interface placeholder; no location image supplied",
    attribution: null,
    author: null,
    originalUrl: null,
    license: null,
    commercialUseAllowed: null,
    licenseUrl: null,
    sourceUrl: null,
    verifiedAt: null,
    authenticity: "unknown",
    subject: null,
    subjectVerifiedAt: null,
    modificationNotes: null,
    provenanceNotes: null,
    reviewedBy: null,
    evidenceUrls: [],
    reviewStatus: "needs-review",
  };
}
