import salesModel from "../models/salesModel.js"
import clientsModel from "../models/clientsModel.js";

const salesController = {};

salesController.get = async (req, res) => {
    try {
        const allSales = await salesModel.find();
        return res.status(200).json(allSales);
    } catch (error) {
        console.log("Error en crud de Sales: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

salesController.post = async (req, res) => {
    try {
        let { customerId, quantity, purchaseDate, total, paymentStatus, transactionId } = req.body;
        
        customerId = customerId?.trim();
        transactionId = transactionId?.trim();
        
        if( !customerId || quantity <= 0 || purchaseDate > Date.now() || total <= 0 || !transactionId ){
            return res.status(400).json({ message: "Campos requeridos faltantes o invalidos" });
        }

        const userFound = await clientsModel.findById(customerId);
        if(!userFound){
            return res.status(400).json({ message: "Id de cliente no encontrado o inexistente" });
        }
        
        const newSale = salesModel({ customerId, quantity, purchaseDate, total, paymentStatus, transactionId });
        await newSale.save();
        
        return res.status(200).json({ message: "Sale saved" });
    } catch (error) {
        console.log("Error en crud de Sales: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

salesController.put = async (req, res) => {
    try {
        let { customerId, quantity, purchaseDate, total, transactionId } = req.body;
        
        customerId = customerId?.trim();
        transactionId = transactionId?.trim();
        
        if( !customerId || quantity <= 0 || purchaseDate > Date.now() || total <= 0 || !transactionId ){
            return res.status(400).json({ message: "Campos requeridos faltantes o invalidos" });
        }

        const userFound = await clientsModel.findById(customerId);
        if(!userFound){
            return res.status(400).json({ message: "Id de cliente no encontrado o inexistente" });
        }

        const saleFound = await salesModel.findById(req.params.id);

        if(!saleFound){
            return res.status(400).json({ message: "Id de sale no encontrado" });
        }

        await salesModel.findByIdAndUpdate(req.params.id, { customerId, quantity, purchaseDate, total, paymentStatus: true, transactionId } );

        return res.status(200).json({ message: "Sale updated" });
    } catch (error) {
        console.log("Error en crud de Sales: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

salesController.delete = async (req, res) => {
    try {
        const deleted = await salesModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ message: "Boleto no encontrado" });
        }
        return res.status(200).json({ message: "Boleto deleted" });
    } catch (error) {
        console.log("Error en crud de Sales: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export default salesController;