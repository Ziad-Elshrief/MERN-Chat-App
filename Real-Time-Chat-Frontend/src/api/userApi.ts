export class UserInfoApi {
  static register = async (
    name: string,
    email: string,
    password: string,
    avatar: number
  ) => {
    const response = await fetch("/api/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, email, password, avatar }),
    });
    const data = await response.json();
    return data;
  };
  static login = async (email: string, password: string) => {
    const response = await fetch("/api/users/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  };
  static logout = async () => {
    const response = await fetch("/api/users/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();
    return data;
  };
  static getUserInfo = async () => {
    const response = await fetch("/api/users/profile");
    const data = await response.json();
    return data;
  };
  static updateUserInfo = async (
    email: string,
    name: string,
    avatar: number
  ) => {
    const response = await fetch("/api/users/profile", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ email, name, avatar }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  };
  static updateUserPassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const response = await fetch("/api/users/update-password", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  };
  static refreshToken = async () => {
    const response = await fetch("/api/refresh-token", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();
    return data;
  };
}
