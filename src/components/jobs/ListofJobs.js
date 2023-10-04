const ListofJobs = (props) => {

    const list = (
        
        <ul>
            {props.jobContent.map((job)=>{
                return (
                    <li key={job._id}>
                        <h3>{job.position}</h3>
                        <h5>{job.company}</h5>
                    </li>
                )
            })}
        </ul>
    )

    return ( 
        <div>
            {list}
        </div>
     );
}
 
export default ListofJobs;