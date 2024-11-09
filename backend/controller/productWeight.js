const BatchWeight = require('../models/batchWeight')
const Notification = require('../models/notification')
const Product = require('../models/product')
const router = require('express').Router()
const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { percentile } = require("percentile"); 

const upload = multer()

router.post("/new", upload.single("file"), async (req, res) => {
    // body = { prodId, prodName, targetWeight }
    console.log("1111111111111111111")
    const { prodId, prodName, targetWeight } = req.body;
    const file = req.file;
    console.log(req.body)
    console.log(req.file)

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    let values = [];

    const percentile = (p, values) => {
        console.log(values)
        if (values.length === 0) return null; // Return null if there are no values
        const index = (p / 100) * (values.length - 1);
        const lower = Math.floor(index);
        const upper = lower + 1;
        const weight = index % 1;
    
        if (upper >= values.length) return values[lower];
        return values[lower] * (1 - weight) + values[upper] * weight;
    }

    Readable
        .from(file.buffer)
        .pipe(csv())
        .on("data", (row) => {
            const columnValue = parseFloat(row["cooking_weight_difference"]);
            console.log("col val", row)
            if (!isNaN(columnValue)) values.push(columnValue);
        })
        .on("end", async () => {
                values.sort((a, b) => a - b);
                const lowerCookingLossBound = percentile(5, values);
                const upperCookingLossBound = percentile(95, values);

                const newProduct = new Product({
                    prodId,
                    prodName,
                    targetWeight,
                    lowerCookingLossBound,
                    upperCookingLossBound,
                })

                await newProduct.save()
                res.json({
                    prodId,
                    prodName,
                    targetWeight,
                    lowerCookingLossBound,
                    upperCookingLossBound,
                });
            })
            .on("error", (error) => {
                res.status(500).json({ error: "Error processing CSV file" });
            });
});

router.post("/:prodId", async (req, res) => {
    // body = { weight }

    const body = req.body
    const prodId = req.params.prodId
    const product = await Product.findOne({ prodId })
    const targetWeight = product.targetWeight
    const actualWeight = body.weight

    console.log("2 weight", targetWeight, actualWeight, body)

    const finalProdDeviation = (actualWeight - targetWeight) / targetWeight

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
    if (abnormal) {
        const notification = new Notification({
            prodId,
            phase: 4,
            statistic: finalProdDeviation
        })
        notification.save()
    }
    res.json({
        abnormal,
        finalProdDeviation
    })
})

router.get("/all", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router
