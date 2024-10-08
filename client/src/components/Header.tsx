import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useLogoutMutation } from "@/redux/slices/api";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { updateIsOwner } from "@/redux/slices/compilerSlice";

export default function Header() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = -useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );
  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );
  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(updateIsOwner(false));
      navigate("/");

    } catch (error) {
      handleError(error);
    }
  }
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none">WD Compiler</h2>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant="outline">Compiler</Button>
          </Link>
        </li>
        <li>
              <Link to="/all-codes">
              <Button
              
                variant="blue"
              >
                All Codes
              </Button>
              </Link>
            </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/my-codes">
              <Button
                variant={"success"}
              >
                My Codes
              </Button>
              </Link>
            </li>

            <li>
              <Button
                loading={isLoading}
                onClick={handleLogout}
                variant="destructive"
              >
                Logout
              </Button>
            </li>
            <li>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="capitalize">
                  {currentUser.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button variant="blue">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button variant="blue">Signup</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}