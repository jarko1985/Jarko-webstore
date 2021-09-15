import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin user",
    email: "admin@example.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "hassan",
    email: "hassan@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "beverly",
    email: "beverly@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

export default users;
