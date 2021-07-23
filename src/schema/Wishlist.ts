import { Schema, model, Document } from "mongoose";

interface WishlistInterface extends Document {
  nome?: String,
  descricao?: String,
  complemento?: Array<String>,
  img?: String,
  marcado?: Boolean,
  quantidade?: Number,
  tipo?: String,
  valor?: Number
};

/**
 * Tipo:
 * 1 - Tradicional Salgado
 * 2 - Especial 1 Salgado
 * 3 - Especial 2 Salgado
 * 4 - Especial 3 Salgado
 */
const WishlistSchema = new Schema({
    nome: String,
    descricao: String,
    complemento: {
      type: Array,
      default: []
    },
    img: String,
    marcado: {
      type: Boolean,
      default: false
    },
    quantidade: {
      type: Number,
      default: 0
    },
    tipo: Number,
    valor: Number
  },
  {
    timestamps: true
  }
);

export default model<WishlistInterface>('Wishlist', WishlistSchema);