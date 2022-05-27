/*
 * @jest-environment jsdom
 */
import { userLogin, userGoogle } from "../../src/lib/authentication.js";

import login from "../../src/pages/login.js";

jest.mock("../../src/lib/export.js");
jest.mock("../../src/lib/authentication.js");

describe("pagina de login", () => {
  it("Should login the user successfully", () => {
    userLogin.mockResolvedValueOnce();

    const page = login();
    const user = page.querySelector(".email");
    const password = page.querySelector(".password");

    user.value = "teste@lab.com";
    password.value = "1234567";
    page.submit();
    expect(userLogin).toHaveBeenCalledWith("teste@lab.com", "1234567");
  });
});

const error = { code: "udh/internal-error" };

it("should return an error message if the email or password is invalid", () => {
  userLogin.mockResolvedValueOnce(error);
  const page = login();
  const user = page.querySelector(".email");
  const password = page.querySelector(".password");

  user.value = "teste@lab.com";
  password.value = "1234567";
  page.submit();

  expect(userLogin).toHaveBeenCalledWith("teste@lab.com", "1234567");
});

describe(userGoogle, () => {
  it("if the user is valid, he/she must log in with the Google account", () => {
    userGoogle.mockResolvedValueOnce();
    const page = login();
    const btnGoogle = page.querySelector(".google");

    btnGoogle.dispatchEvent(new Event("click"));
    expect(userGoogle).toHaveBeenCalledTimes(1);
  });
});
