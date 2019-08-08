import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const User = new Schema({
    name: { type: String },
    email: { type: String }
});
export default mongoose.model('user', User);