const axios = require('axios')
const BatchWeight = require('../models/batchWeight')
const Product = require('../models/product')
const Notification = require('../models/notification')
const router = require('express').Router()

router.post('/:process/', async (req, res) => {
    const process = req.params.process
    const batchIdAndDate= req.params.batchIdAndDate
    const body = req.body
    console.log(body)
    const batchId = body.batchId
    const batchDate = new Date(body.batchDate)
    if (process == "preprocess") {
        const prodId = body.prodId
        const weightsBeforeCooking = body.weightsBeforeCooking
        const batch = new BatchWeight({
            stage: 2,
            prodId,
            batchId,
            batchDate,
            weightsBeforeCooking
        })
        console.log(batch);
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
            const notification = new Notification({
                batchId,
                batchDate,
                phase: 2,
                statistic: weightLossDuringCooking
            })
            notification.save()
        }

        

        res.json({
            abnormal,
            weightLossDuringCooking
        })

    } else if (process == "storage") {
        const weightsAfterStorage = body.weightsAfterStorage
        const storageEnd = new Date(body.storageEnd)
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
            const notification = new Notification({
                batchId,
                batchDate,
                phase: 3,
                statistic: weightLossRate
            })
            notification.save()
        }

        res.json({
            abnormal,
            weightLossRate
        })
    }
})

router.get('/:batchId', async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const batch = await BatchWeight.findOne({ batchId });
        if (!batch) {
            return res.status(404).json({ error: 'Batch not found' });
        }
        res.json(batch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router