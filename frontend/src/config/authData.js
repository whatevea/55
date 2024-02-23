export const loggedInData = () => {
    if (!localStorage.getItem("userData")) return {};
  
    return JSON.parse(localStorage.getItem("userData"));
  };
  
  export const setLoggedInData = () => {};
  