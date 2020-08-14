import { create } from "apisauce";
import { AsyncStorage } from "react-native";

const api = create({
  baseURL: "https://api-postmake.herokuapp.com",
});

api.addAsyncRequestTransform(async (request) => {
  const token = await AsyncStorage.getItem("@postmake/token");
  request.headers["Authorization"] = `Bearer ${token}`;
});

export default api;
