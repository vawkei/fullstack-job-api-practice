import classes from "./UpdateJob.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import {useSelector} from "react-redux";

const UpdateJob = () => {
  const { id } = useParams();

  const token = useSelector((state) => state.token.token);

  const navigate = useNavigate();

  useEffect(() => {
    getInputDetails()
  }, []);

  const companyRef = useRef();
  const positionRef = useRef();

  const getInputDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/jobs/${id}`,{
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json()
      if(data){
        companyRef.current.value=data.company;
        positionRef.current.value=data.position
      }
      console.log(data);
      if(!response.ok){
        throw new Error("Something went wrong")
      }

    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    const enteredCompany = companyRef.current.value;
    const enteredPosition = positionRef.current.value;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/jobs/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: id,
          company: enteredCompany,
          position: enteredPosition,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      navigate("/job-listings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(id);
        }}>
        <div className={classes.control}>
          <label htmlFor="">company</label>
          <input type="text" ref={companyRef} />
        </div>
        <div>
          <label>position</label>
          <input type="text" ref={positionRef} />
        </div>
        <div className={classes.action}>
          <button>Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJob;
