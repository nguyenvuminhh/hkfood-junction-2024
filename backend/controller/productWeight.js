const BatchWeight = require('../models/batchWeight')
const Product = require('../models/product')
const router = require('express').Router()

router.post("/:prodId", async (req, res) => {
    const body = req.body
    const prodId = req.params.prodId
    const product = await Product.findOne({ prodId })
    const targetWeight = product.targetWeight
    const actualWeight = body.weight

    const deviation = (actualWeight - targetWeight) / targetWeight

    const isWeightWithinBounds = (targetWeight, actualWeight) => {
        let allowedDeviation = 0;
    
        // Define bounds and their allowed deviations
        if (targetWeight >= 5 && targetWeight <= 50) {
            allowedDeviation = targetWeight * 0.09; // 9% of target weight
        } else if (targetWeight > 50 && targetWeight <= 100) {
            allowedDeviation = 4.5; // Fixed 4.5 grams/milliliters
        } else if (targetWeight > 100 && targetWeight <= 200) {
            allowedDeviation = targetWeight * 0.045; // 4.5% of target weight
        } else if (targetWeight > 200 && targetWeight <= 300) {
            allowedDeviation = 9; // Fixed 9 grams/milliliters
        } else if (targetWeight > 300 && targetWeight <= 500) {
            allowedDeviation = targetWeight * 0.03; // 3% of target weight
        } else if (targetWeight > 500 && targetWeight <= 1000) {
            allowedDeviation = 15; // Fixed 15 grams/milliliters
        } else if (targetWeight > 1000 && targetWeight <= 10000) {
            allowedDeviation = targetWeight * 0.015; // 1.5% of target weight
        } else {
            throw new Error("Target weight is out of specified bounds");
        }
    
        // Calculate bounds
        const lowerBound = targetWeight - allowedDeviation;
        const upperBound = targetWeight + allowedDeviation;
    
        // Check if the actual weight is within bounds
        return actualWeight >= lowerBound && actualWeight <= upperBound;
    }
    
    const abnormal = !isWeightWithinBounds(targetWeight, actualWeight)

    res.json({
        abnormal,
        deviation
    })
})