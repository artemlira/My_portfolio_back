import mongoose from "mongoose";

const FactSchema = new mongoose.Schema({
  valueEN: {
    type: Array,
    required: true,
  },
  valueUA: {
    type: Array,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
});

export default mongoose.model('Fact', FactSchema);