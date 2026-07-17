/*
    customerId
    quantity
    purchaseDate
    total
    paymentStatus
    transactionId
*/

import mongoose, { Schema, model } from "mongoose"
import clientsModel from "./clientsModel.js";

const salesModel = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: clientsModel
    },
    quantity: {
        type: Number
    },
    purchaseDate: {
        type: Date
    },
    total: {
        type: Number
    },
    paymentStatus: {
        type: Boolean
    },
    transactionId: {
        type: String
    },
},{
    timestamps: true,
    strict: false
});

export default model("Sales", salesModel, "Sales");