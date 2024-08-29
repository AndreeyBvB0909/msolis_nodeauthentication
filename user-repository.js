import DBLocal from "./db-local";
import crypto from "crypto";
const { Schema } = new DBLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static create({ username, password }) {
    //validaciones
    if (typeof username !== "string" || username.length < 3) {
      throw new Error("El nombre de usuario debe tener al menos 4 caracteres");
    }
    if (typeof password !== "string" || password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }
    //asegurarse de que el usuario no exista
    const user = User.findOne({ username });
    if (user) {
      throw new Error("El usuario ya existe");
    }
    const _id = crypto.randomUUID();

    User.create({ _id, username, password }).save();
    return _id;
  }
  static login({ username, password }) {}
}
