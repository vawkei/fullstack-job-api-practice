import classes from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { tokenActions } from "../../store/index";

const MainNavigation = () => {
  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  const dispatch = useDispatch();
  const theresToken = useSelector((state)=>state.token.token);

 const removeToken = ()=>{
  dispatch(tokenActions.setClearToken())
 }; 

  return (
    <div className={classes.header}>
      <Link to={"/"}>
        <h1>Express Auth II</h1>
      </Link>
      <ul>
        {!theresToken &&<NavLink to={"/auth"} className={navDataHandler}>
          <li>Login</li>
        </NavLink>}
        {theresToken &&<NavLink to={"/job-form"} className={navDataHandler}>
          <li>Job form</li>
        </NavLink>}
        {theresToken &&<NavLink to={"/job-listings"} className={navDataHandler}>
          <li>Job listings</li>
        </NavLink>}

        {theresToken && <NavLink  onClick={removeToken}>
          <li>Logout</li>
        </NavLink>}
      </ul>
    </div>
  );
};

export default MainNavigation;
