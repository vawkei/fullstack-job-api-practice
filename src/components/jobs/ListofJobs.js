import { useState } from "react";
import Card from "../ui/cards/Card";
import classes from "./ListofJobs.module.css";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListofJobs = (props) => {
  const [hideJob, setHideJob] = useState([]);

  const token = useSelector((state) => state.token.token);

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error();
      }
      setHideJob([...hideJob, id]);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const list = (
    <ul className={classes.list}>
      {props.jobContent.map((job) => {
        let { _id, position, company, createdAt } = job;
        let date = new Date(createdAt);
        // date = date.getDate() + " " + date.toLocaleString()
        date = `${date.toDateString()}, ${date.toLocaleTimeString()}`;
        return (
          <div key={_id}>
            {!hideJob.includes(_id) ? (
              <Card className={classes.job}>
                <li>
                  <div className={classes["first-div"]}>
                    <h2>{position}</h2>
                    <p>{company}</p>
                  </div>
                  <div className={classes["second-div"]}>
                    <p>{date}</p>
                    <div className={classes.icons}>
                      <Link to={`/update-job/${_id}`}>
                        {" "}
                        <AiFillEdit />{" "}
                      </Link>
                      <BsTrash onClick={() => deleteJob(_id)} />
                    </div>
                  </div>
                </li>
              </Card>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </ul>
  );

  return <div>{list}</div>;
};

export default ListofJobs;
