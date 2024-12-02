import UserData from "../views/plugin/UserData";

const URL = "http://localhost:8000/";
const userId = UserData()?.user_id;
export { URL, userId };
