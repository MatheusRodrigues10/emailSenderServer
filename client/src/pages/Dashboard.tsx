import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authValue = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <p>Tela de pesquisas</p>
    </div>
  );
};

export default DashBoard;
