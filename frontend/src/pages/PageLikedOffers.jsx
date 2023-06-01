/* eslint-disable react/function-component-definition */
import { useParams } from "react-router-dom";
import LikedOffers from "../components/likedOffers/LikedOffers";

const PageLikedOffers = () => {
  const { candidateId } = useParams();
  return <LikedOffers candidateId={candidateId} />;
};

export default PageLikedOffers;
