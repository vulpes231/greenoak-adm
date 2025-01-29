const options = [
  { id: 1, title: "Checking" },
  { id: 2, title: "Savings" },
  { id: 3, title: "Money Market" },
  { id: 4, title: "IRA traditional savings" },
];

const devurl = "http://localhost:5000";
const liveurl = "https://server.regentoak.us";

const sendError = (error) => {
  if (error.response) {
    const errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  } else {
    throw error;
  }
};

const getAccessToken = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    return accessToken;
  } else {
    return null;
  }
};

const authLinks = [
  { id: 1, title: "Dashboard", path: "/dash" },
  { id: 2, title: "Users", path: "/user" },
  { id: 3, title: "Transactions", path: "/transaction" },
  { id: 4, title: "Sendmail", path: "/sendmail" },
];

const customStyles = {
  title: "text-2xl font-bold",
  td: "px-6 py-2.5 capitalize font-bold text-sm",
  th: "px-6 py-2.5 capitalize text-sm",
};

export {
  options,
  devurl,
  liveurl,
  sendError,
  getAccessToken,
  authLinks,
  customStyles,
};
