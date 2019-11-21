import AsyncStorage from "AsyncStorage";

export async function getToken() {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    alert(error);
  }
}
