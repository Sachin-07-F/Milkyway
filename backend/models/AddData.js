import mongoose from 'mongoose';


const AddDataSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  weeklyData: {
    week1: { type: Number, required: true, default: 0 },
    week2: { type: Number, required: true, default: 0 },
    week3: { type: Number, required: true, default: 0 },
    week4: { type: Number, required: true, default: 0 },
    week5: { type: Number, required: true, default: 0 },
  },
  dailyData: {
    sunday: { type: Number, required: true, default: 0 },
    monday: { type: Number, required: true, default: 0 },
    tuesday: { type: Number, required: true, default: 0 },
    wednesday: { type: Number, required: true, default: 0 },
    thursday: { type: Number, required: true, default: 0 },
    friday: { type: Number, required: true, default: 0 },
    saturday: { type: Number, required: true, default: 0 },
  },
  monthlyData: {
    january: { type: Number, required: true, default: 0 },
    february: { type: Number, required: true, default: 0 },
    march: { type: Number, required: true, default: 0 },
    april: { type: Number, required: true, default: 0 },
    may: { type: Number, required: true, default: 0 },
    june: { type: Number, required: true, default: 0 },
    july: { type: Number, required: true, default: 0 },
    august: { type: Number, required: true, default: 0 },
    september: { type: Number, required: true, default: 0 },
    october: { type: Number, required: true, default: 0 },
    november: { type: Number, required: true, default: 0 },
    december: { type: Number, required: true, default: 0 },
  },
});

const AddData = mongoose.model('AddData', AddDataSchema);

export default AddData;
