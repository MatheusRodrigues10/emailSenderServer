import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { increment } from "../redux/features/authSlice";

const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authValue = useSelector((state: RootState) => state.auth.value);

  return (
    <div>
      <p>Tela de pesquisas</p>
    </div>
  );
};

export default DashBoard;
