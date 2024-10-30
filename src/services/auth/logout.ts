import Routes from "@/utils/Routes";


export const USER_LOGOUT = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");

  window.location.href = Routes.login;
}