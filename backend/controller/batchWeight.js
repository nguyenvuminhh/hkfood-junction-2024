const axios = require('axios')
const BatchWeight = require('../models/batchWeight')
const Product = require('../models/product')
const router = require('express').Router()

router.post('/:process/:batchIdAndDate', async (req, res) => {
    const process = req.params.process
    const batchIdAndDate= req.params.batchIdAndDate
    const body = req.body
    const batchId = batchIdAndDate.split("|")[0]
    const batchDate = new Date(batchIdAndDate.split("|")[1]) 

    if (process == "preprocess") {
        const weightsBeforeCooking = body.weightsBeforeCooking
        const batch = new BatchWeight({
            stage: 2,
            batchId,
            batchDate,
            weightsBeforeCooking
        })
        batch.save()
        res.json({
            ok: 'ok'
        })
    } else if (process == "cooking") {
        const weightsAfterCooking = body.weightsAfterCooking
        const storageStart = body.storageStart
        const batch = await BatchWeight.findOneAndUpdate({ batchId },                     
            { 
                $set: { 
                    storageStart,
                    weightsAfterCooking,    
                    stage: 3                 
                } 
            },
            { new: true }
        )
        const weightLossDuringCooking = batch.weightsBeforeCooking - weightsAfterCooking
        const product = await Product.findOne({ prodId: batch.prodId })
        let abnormal = false
        if (weightLossDuringCooking < product.lowerCookingLossBound || weightLossDuringCooking > product.upperCookingLossBound) {
            abnormal = true
        }

        res.json({
            abnormal,
            weightLossDuringCooking
        })

    } else if (process == "storage") {
        const weightsAfterStorage = body.weightsAfterStorage
        const storageEnd = body.storageEnd
        const batch = await BatchWeight.findOneAndUpdate({ batchId },                     
            { 
                $set: { 
                    storageEnd,
                    weightsAfterStorage,    
                    stage: 4                 
                } 
            },
            { new: true }
        )
        const storageTime = (storageEnd - new Date(batch.storageStart)) / (1000 * 60 * 60 * 24)
        const lossRatePerDay = 99/100

        const idealWeightAfterStorage = batch.weightsAfterCooking * Math.pow(lossRatePerDay, storageTime)
        const weightLossRate = (weightsAfterStorage - idealWeightAfterStorage) / idealWeightAfterStorage
        const threshold = 1/100

        let abnormal = false
        if (weightLossRate < threshold) {
            abnormal = true
        }

        res.json({
            abnormal,
            weightLossRate
        })
    }
})