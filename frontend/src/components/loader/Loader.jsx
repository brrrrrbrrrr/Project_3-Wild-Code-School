/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ color }) => {
  return <ThreeDots color={color} height={80} width={80} />;
};

export default Loader;
