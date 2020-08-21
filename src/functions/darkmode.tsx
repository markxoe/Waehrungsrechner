import { Storage } from "@capacitor/core";

class darkmodeOriginal {
  public isDarkMode = false;
  public init() {
    console.log("Init");
    Storage.get({ key: "isDark" }).then(
      (value) => {
        if (value.value) {
          this.set(value.value === "1");
        } else {
          this.set(true);
        }
      },
      () => {
        this.set(true);
      }
    );
  }
  public set(dark: boolean) {
    Storage.set({ key: "isDark", value: dark ? "1" : "0" });
    document.body.classList.toggle("dark", dark);
    this.isDarkMode = dark;
  }
}
export const darkmode = new darkmodeOriginal();
export default darkmode;
