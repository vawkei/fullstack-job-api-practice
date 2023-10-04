import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/Auth";
import Layout from "./components/layout/Layout";
import HomePage from "./components/start-component/HomePage";
import Jobs from "./components/jobs/Jobs";
import { useSelector } from "react-redux";
import JobForm from "./components/job-form/JobForm";

function App() {

  const theresToken = useSelector((state)=>state.token.token)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!theresToken && <Route path="/auth" element={<AuthForm />} />}
         <Route path="/job-listings" element={<Jobs />}/>
         <Route path="/job-form" element={<JobForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
