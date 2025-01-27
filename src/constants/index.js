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

export { options, devurl, liveurl, sendError };
// Compare this snippet from src/features/createUserSlice.js:
