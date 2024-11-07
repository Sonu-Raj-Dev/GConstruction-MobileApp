const BASE_URL = 'https://gconstruction-api.vercel.app/api';

export default {
  GetAllEmployee: `${BASE_URL}/EmployeeMaster/getuser`,
  AddEmployee:`${BASE_URL}/EmployeeMaster/Create`,
  GetAllCompanies:`${BASE_URL}/Company/getAllCompany`,
  AddCompany:`${BASE_URL}/Company/Create`,
  GetDashBoardData:`${BASE_URL}/DashBoard/getDahBoardData`,
};
