import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const NoteSchema = new Schema({
  description: {
    type: String
  },
  password: {
    type: String
  }, 
  uniqUrl: {
    type: String
  }
})


const NoteModel = mongoose.model('notes', NoteSchema)
export default NoteModel
