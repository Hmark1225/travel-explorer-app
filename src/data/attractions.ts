/** Legacy exports remain available; content is maintained in per-destination modules. */
export { admissionLabels } from "./builders.ts";
import { destination as rhodes } from "./content/rhodes.ts";
import { destination as rome } from "./content/rome.ts";
import { destination as budapest } from "./content/budapest.ts";
export const rhodesAttractions = rhodes.attractions;
export const romeAttractions = rome.attractions;
export const budapestAttractions = budapest.attractions;
