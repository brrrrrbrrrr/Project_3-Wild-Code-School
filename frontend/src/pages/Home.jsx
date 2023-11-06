/* eslint-disable import/no-unresolved */
import BodyOffers from "@components/bodyOffers/BodyOffers";
import FilterAlert from "@components/filterAlert/filterAlert";
import Presentation from "../components/presentation/Presentation";

export default function Home() {
  return (
    <div>
      <Presentation />
      <BodyOffers />
      <FilterAlert />
    </div>
  );
}
