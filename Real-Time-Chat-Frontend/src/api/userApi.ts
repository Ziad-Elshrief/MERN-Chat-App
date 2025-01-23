export class UserInfoApi {
  static register = async (
    name: string,
    email: string,
    password: string,
    avatar: number
  ) => {
    try {
      const response = await fetch("api/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email, password, avatar }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  static login = async (email: string, password: string) => {
    try {
      const response = await fetch("api/users/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  static getUserInfo = async () => {
    try {
      const response = await fetch("api/users/profile");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
