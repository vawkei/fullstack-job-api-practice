import { useEffect, useState } from "react";
import classes from "./Jobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store/index";
import ListofJobs from "./ListofJobs";

const Jobs = () => {
  const [nameContent, setNameContent] = useState("");
  const [jobContent, setjobContent] = useState([]);
  const [noTokenMessage, setNoTokenMessage] = useState("");

  //let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    if (token) {
      getJobsToken();
    } else {
      getJobsNoToken();
    }
  }, []);

  //getJobsToken:
  const getJobsToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const receivedData = await response.json();
      // console.log(receivedData.user);
      setNameContent(receivedData.user);
      console.log(receivedData.jobs);
      setjobContent(receivedData.jobs);
      dispatch(
        tokenActions.setActiveToken({ user: receivedData.user, token: token })
        //this sends it to redux-store
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //getJobsNoToken:

  const getJobsNoToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/jobs");
      const data = await response.json();
      if (!response.ok || !response.headers) {
        throw new Error(
          setNoTokenMessage(data.msgOne) || "Something went wrong"
        );
      }
      console.log(data);
      setNoTokenMessage(data.msgOne);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["jobs-container"]}>
      {jobContent.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          {token ? (
            <>
              <h1>This is the Jobs Page</h1>
              <section className={classes.intro}>
                <p>
                  Good day <b>{nameContent}</b>
                </p>{" "}
                <h2>Express BadASS in the making</h2>
              </section>
              <div className={classes.jobs}>
                <ListofJobs jobContent={jobContent} />
              </div>
            </>
          ) : (
            <>
              <h1>This is the Jobs Page</h1>
              <section>
                <p>{noTokenMessage}</p>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;
