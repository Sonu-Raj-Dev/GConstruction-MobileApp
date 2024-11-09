const BASE_URL = 'https://gconstruction-api.vercel.app/api';
//const BASE_URL ='http://localhost:5000/api';
export default {
  GetAllEmployee: `${BASE_URL}/EmployeeMaster/getuser`,
  AddEmployee:`${BASE_URL}/EmployeeMaster/Create`,
  GetAllCompanies:`${BASE_URL}/Company/getAllCompany`,
  AddCompany:`${BASE_URL}/Company/Create`,
  GetDashBoardData:`${BASE_URL}/DashBoard/getDahBoardData`,
  GetCalenderData:`${BASE_URL}/Calender/getCalenderData`,
  AddCalenderData:`${BASE_URL}/Calender/Create`
};
