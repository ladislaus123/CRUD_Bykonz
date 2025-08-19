const express = require('express');
const router = express.Router();
const Customers = require('../models/model.js')
const multer = require("multer");
const upload = multer(); // stores file in memory



router.get('/', async(req, res) => {
try{
    const All_Customers = await Customers.find({})
    res.status(200).json(All_Customers)
}catch(error){
    console.log("Error fetching customers")
    res.status(500).json({message:error})
}
 
});

router.post("/", upload.single("shipPhoto"), async (req, res) => {
  try {
    const entry = new Customers({
      ...req.body,
      shipPhoto: req.file.buffer, // save image as Buffer
    });

    await entry.save();
    res.json({ message: "Customer saved successfully", entry });
  } catch (error) {
    console.error("Error saving customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/:id', async (req, res) => {

    try{
        const single_Customer = await Customers.findById(req.params.id);
        res.status(200).json(single_Customer);
    }catch(error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customers.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customers.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




module.exports = router;