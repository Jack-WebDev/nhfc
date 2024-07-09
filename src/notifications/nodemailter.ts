import nodemailer from "nodemailer";
import { email, pass } from ".";

type AccountDetails = {
  email: string;
  password: string;
  role: string;
  status: string;
};
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

export const createUserTemplate = (
  accountInfo: AccountDetails
) => {
  const html = `
    <h1>Alfred Duma Municipality</h1>
    <p>You have been registered as a member and a user of our Book management system </p>
    <h3>Account information</h3>
    <div>
        <ul style={{listStyle: "none"}}>
            <li>Email:  ${accountInfo.email} </li>
            <li>Password:  ${accountInfo.password} </li>
            <li>Role:  ${accountInfo.role} </li>
            <li>Status:  ${accountInfo.status.split("_").join(" ")} </li>
            <li>Link:  ${process.env.NEXT_PUBLIC_URL} </li>
        </ul>

    </div>

`;

  return html;
};
export const deactivateUserTemplate = () => {
  const html = `
    <h1>Alfred Duma Municipality</h1>
    <p>Your account has been deactivated from the book management system. <br />
    you will not have access to the sysytem untill your account is reactivated</p>
    

`;

  return html;
};
