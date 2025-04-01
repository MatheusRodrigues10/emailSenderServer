import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { increment } from "../redux/features/authSlice";

const DashBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authValue = useSelector((state: RootState) => state.auth.value)

    return(
        <div>
            <button onClick={() => dispatch(increment())}>Clique aqui</button>
            <h1>Valor do Auth: {authValue}</h1>
        </div>
    );
};

export default DashBoard;