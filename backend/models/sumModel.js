import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: { type: Number, required: true },
    locationName: { type: String, required: true },
    date: { type: Date, required: true },
    loginHour: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    brandDevice: { type: String, required: true },
    digitalInterest: { type: String, required: true },
    locationType: { type: String, required: true },
});

export const Summary = mongoose.model('Higo', visitorSchema, 'Higo');