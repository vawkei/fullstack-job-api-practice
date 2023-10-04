import { useSelector } from "react-redux";
import classes from "./JobForm.module.css";
import { useRef, useState } from "react";

const JobForm = () => {
  const companyInputRef = useRef();
  const positionInputRef = useRef();

  const token = useSelector((state) => state.token.token);
  const [inputError, setInputError] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredCompany = companyInputRef.current.value;
    const enteredPosition = positionInputRef.current.value;

    try {
      const response = await fetch("http://localhost:5000/api/v1/jobs", {
        method: "POST",
        body: JSON.stringify({
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
    } catch (error) {
      console.log(error);
    }
    e.target.reset()
  };

  return (
    <>
      {token ? (
        <div className={classes["form-container"]}>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label>company</label>
              <input type="text" ref={companyInputRef} />
            </div>
            <div className={classes.control}>
              <label>position</label>
              <input type="text" ref={positionInputRef} />
            </div>
            <div className={classes.action}>
              <button>Submit</button>
            </div>
            <p>{inputError}</p>
          </form>
        </div>
      ) : (
        <div className={classes["form-container2"]}>
          <p>Your are not allowed to view this route bro!</p>
        </div>
      )}
    </>
  );
};

export default JobForm;



















// import React, { useEffect, useRef, useState } from 'react';
// import classes from './YourFormComponent.module.css'; // Import your CSS module

// const YourFormComponent = () => {
//   const [token, setToken] = useState(null);
//   const [inputError, setInputError] = useState('');
//   const companyInputRef = useRef(null);
//   const positionInputRef = useRef(null);

//   useEffect(() => {
//     // Check if the user has a valid token
//     const fetchToken = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/v1/token-validation', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Replace with your actual token
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           setInputError(errorData.error || 'Something went wrong');
//         } else {
//           setToken(token); // Token is valid, set it in the state
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//         setInputError('Network error: Unable to connect to the server');
//       }
//     };

//     fetchToken();
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const enteredCompany = companyInputRef.current.value;
//     const enteredPosition = positionInputRef.current.value;

//     try {
//       const response = await fetch('http://localhost:5000/api/v1/jobs', {
//         method: 'POST',
//         body: JSON.stringify({
//           company: enteredCompany,
//           position: enteredPosition,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Replace with your actual token
//         },
//       });

//       const data = await response.json();
//       console.log(data);
//       if (!response.ok) {
//         setInputError(data.error || 'Something went wrong');
//       } else {
//         setInputError(''); // Clear any previous error message
//         // Handle success here
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       setInputError('Network error: Unable to connect to the server');
//     }
//   };

//   return (
//     <>
//       {token ? (
//         <div className={classes['form-container']}>
//           <form onSubmit={submitHandler}>
//             <div className={classes.control}>
//               <label>Company</label>
//               <input type="text" ref={companyInputRef} />
//             </div>
//             <div className={classes.control}>
//               <label>Position</label>
//               <input type="text" ref={positionInputRef} />
//             </div>
//             <div className={classes.action}>
//               <button>Submit</button>
//             </div>
//             <p>{inputError}</p>
//           </form>
//         </div>
//       ) : (
//         <div className={classes['form-container']}>
//           <p>{inputError}</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default YourFormComponent;
