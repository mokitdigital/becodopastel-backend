import { Schema, model, Document, Error } from "mongoose";
import bcrypt from "bcrypt";

interface UserInterface extends Document {
  nomeCompleto?: string,
  dataNascimento?: string,
  email?: string,
  celular?: number,
  cpf?: number,
  cep?: number,
  sexo?: string,
  endereco?: string,
  numero?: number,
  complemento?: string,
  cidade?: string,
  estado?: string,
  token?: string,
  password?: string
};

export interface IAuthDocument extends UserInterface, Document {
  checkPassword: (this: IAuthDocument) => Promise<Boolean>
}

const UserSchema = new Schema({
    nomeCompleto: String,
    dataNascimento: String,
    email: String,
    celular: Number,
    cpf: Number,
    cep: Number,
    sexo: String,
    endereco: String,
    numero: Number,
    complemento: String,
    cidade: String,
    estado: String,
    token: String,
    password: String
  },
  {
    timestamps: true
  }
);

UserSchema.pre<IAuthDocument>("save", function save(next) {
  const user = this;

  if (!user.isModified("password")) { return next(); }

  bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }

      if (typeof user.password !== 'undefined') {
        bcrypt.hash(user.password, salt).then(response => {
            if (err) { return next(err); }
            user.password = response;
            next();
        });
      }
  });
});

export default model<UserInterface>('User', UserSchema);