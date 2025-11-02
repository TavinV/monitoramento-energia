import express from "express";

import MeasurementsController from "../controllers/measurementsColtroller.js";
import validateApiKey from "../middleware/validateApiKey.js";

const router = express.Router();

router.post("/", validateApiKey, MeasurementsController.createMeasurement);
router.get("/", MeasurementsController.getAllMeasurements);
router.get("/export", MeasurementsController.exportMeasurementsCSV);
router.get("/last", MeasurementsController.getLastMeasurement);
router.delete("/:id", validateApiKey, MeasurementsController.deleteMeasurement);

export default router;
