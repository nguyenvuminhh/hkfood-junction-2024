const BatchWeight = require('../models/batchWeight')
const Product = require('../models/product')
const Notification = require('../models/notification')
const router = require('express').Router()
const { io } = require( '../socket/socket')

router.post('/:process/', async (req, res) => {
    const process = req.params.process
    const body = req.body
    console.log(body)
    const batchId = body.batchId
    const batchDate = new Date(body.batchDate)
    let notification = undefined

    if (process == "preprocess") {
        const prodId = body.prodId
        const weightBeforeCooking = body.weightBeforeCooking
        const batch = new BatchWeight({
            stage: 2,
            prodId,
            batchId,
            batchDate,
            weightBeforeCooking
        })
        console.log(batch);
        batch.save()
        res.json({
            ok: 'ok'
        })
    } else if (process == "cooking") {
        const weightAfterCooking = body.weightAfterCooking
        const storageStart = body.storageStart
        const batch = await BatchWeight.findOneAndUpdate({ batchId },                     
            { 
                $set: { 
                    storageStart,
                    weightAfterCooking,    
                    stage: 3                 
                } 
            },
            { new: true }
        )
        const weightLossDuringCooking = batch.weightBeforeCooking - weightAfterCooking
        const product = await Product.findOne({ prodId: batch.prodId })
        let abnormal = false
        if (weightLossDuringCooking < product.lowerCookingLossBound || weightLossDuringCooking > product.upperCookingLossBound) {
            abnormal = true
            notification = new Notification({
                batchId,
                batchDate,
                phase: 2,
                statistic: weightLossDuringCooking
            })
            notification.save()
            io.emit('notification', notification)
            product.notifications.push(notification)
            product.save()
        }

        res.json({
            notification,
            abnormal,
            weightLossDuringCooking
        })

    } else if (process == "storage") {
        const weightAfterStorage = body.weightAfterStorage
        const storageEnd = new Date(body.storageEnd)
        const batch = await BatchWeight.findOneAndUpdate({ batchId },                     
            { 
                $set: { 
                    storageEnd,
                    weightAfterStorage,    
                    stage: 4                 
                } 
            },
            { new: true }
        )
        console.log("aaaaaa", (storageEnd - new Date(batch.storageStart)))
        
        const storageTime = (storageEnd - new Date(batch.storageStart)) / (1000 * 60 * 60 * 24)
        const lossRatePerDay = 99/100

        const idealWeightAfterStorage = batch.weightAfterCooking * Math.pow(lossRatePerDay, storageTime)
        const weightLossDeviationRate = (weightAfterStorage - idealWeightAfterStorage) / idealWeightAfterStorage
        const threshold = 1/100

        let abnormal = false
        if (weightLossDeviationRate < threshold) {
            abnormal = true
            notification = new Notification({
                batchId,
                batchDate,
                phase: 3,
                statistic: weightLossDeviationRate
            })
            notification.save()
            io.emit('notification', notification)
            const product = await Product.findOne({ prodId: batch.prodId })
            product.notifications.push(notification)
            product.save()
        }

        res.json({
            notification,
            abnormal,
            weightLossDeviationRate
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

router.delete('/', async (req, res) => {
    await Notification.deleteMany({});
    await BatchWeight.deleteMany({});
    await Product.deleteMany({});
    
    res.json({
        ok: 'ok'
    });
})

module.exports = router