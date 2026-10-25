import { destinations, type Destination } from "../data/destinations";
/** Replace this adapter with Supabase queries; screens do not import mock records. */
export interface TravelRepository {
  listDestinations(): Promise<Destination[]>;
}
export const travelRepository: TravelRepository = {
  async listDestinations() {
    return destinations;
  },
};
