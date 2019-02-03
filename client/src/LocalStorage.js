const login = (token) => {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("token", token);
  } else {
    console.log("Sorry! No Web Storage support..");
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, logout };
