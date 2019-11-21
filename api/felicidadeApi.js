import axios from "axios";
import Addresses from "../constants/Addresses";

export default axios.create({
  baseURL: `${Addresses.HOST}:${Addresses.PORT}/api`
});
