import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

const filterAlert = () => {
  const api = useApi();
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    api.get("/filter").then((response) => {
      const value = response.data[0].offerNumber;
      if (value !== 0 && value !== -1) {
        toast.info(`il y a ${value} offre selon vos critères disponible`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });
  }, []);
  return <div className="filterAlert-Container" />;
};
export default filterAlert;
