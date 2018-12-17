const login = (id) => {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("token", id);
  } else {
    console.log("Sorry! No Web Storage support..");
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, logout };
