import axios from "axios";

export const api = axios.create({
  baseURL: "https://hamburgueria-dmsatiro.herokuapp.com/",
});
