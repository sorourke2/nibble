const getToken = () => {
  const token = localStorage.getItem("token");
  return `bearer ${token}`;
};

export default getToken;
