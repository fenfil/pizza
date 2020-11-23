import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { UserState } from "../slices/user";

function useUserSelector() {
  return useSelector<RootState, UserState>(state => state.user, shallowEqual);
}

export default useUserSelector;
