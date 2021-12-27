import { useContext } from "react";
import AuthContext from "../store/auth-context";

const MyUsers = async (req, res) => {
  const authCtx = useContext(AuthContext);

  const user = req.session.get(authCtx.token);
  res.json({ data: authCtx.token });
  console.log(user);
};
export default MyUsers;
