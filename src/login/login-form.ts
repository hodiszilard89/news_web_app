import { Button } from "@chakra-ui/react";
import { AuthService } from "./auth-service";

class LoginForm {
  private form: HTMLFormElement;
  private submitButton: HTMLButtonElement;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.submitButton = this.form.querySelector(
      "button[type='submit']"
    ) as HTMLButtonElement;
  }

  public initialize() {
    // this.submitButton = this.form.querySelector(
    //   "button[type='submit']"
    // ) as HTMLButtonElement;

    this.form.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();
      this.submitButton.setAttribute("disabled", "true");
      await this.login();
      this.submitButton.setAttribute("disabled", "false");
    });
  }
  private async login() {
    try {
      const formData = new FormData(this.form)
      const credentials = {
        username: formData.get("username") as string,
        password: formData.get("password") as string
      }
       await AuthService.login(credentials.username, credentials.password)
       window.location.href = "profile.html"
    } catch (err) {
       console.log(err)
    }
  }
}
((form)=>{
  const page = new LoginForm(form)
  page.initialize();
})(document.querySelector("FORM[name='login']"))
