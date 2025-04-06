export class AuthUtil {
  public static isLoggedIn(): boolean {
    if (localStorage.getItem("online-shopping-ts")) {
      return true;
    } else {
      return false;
    }
  }
  public static getToken(): any {
    return localStorage.getItem("online-shopping-ts");
  }
}
