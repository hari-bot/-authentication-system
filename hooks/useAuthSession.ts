import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

 //  implement the logic here to check user session

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("/api/auth/userAuth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            dispatch(setUser({ username: data.user.username }));
          } else {
            dispatch(clearAuth());
          }
        })
        .catch(() => dispatch(clearAuth()));
    } else {
      dispatch(clearAuth());
    }
  }, [dispatch]);

  return user;
};

export default useAuthSession;
