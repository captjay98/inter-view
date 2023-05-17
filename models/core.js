import mongoose from "mongoose";
const { Schema } = mongoose;

const skillSchema = new Schema({
  name: { type: String, required: true },
});


const industrySchema = new Schema({
  name: { type: String, required: true }
})


const FaqSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});


const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const InterviewHelpSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  }
});




export const Skill = mongoose.model('Skill', skillSchema);
export const Industry = mongoose.model('Industry', industrySchema)
export const Faq = mongoose.model('Faq', FaqSchema);
export const Article = mongoose.model('Article', ArticleSchema);
export const InterviewHelp = mongoose.model('InterviewHelp', InterviewHelpSchema);


