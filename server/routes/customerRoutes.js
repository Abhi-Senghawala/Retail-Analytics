import express from "express";
import multer from "multer";
import { uploadCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer, getAnalytics } from "../controllers/customerController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(protect);

router.post('/upload', upload.single('file'), uploadCustomer);
router.get('/', getCustomers);
router.get('/analytics', getAnalytics);
router.route('/:id').get(getCustomerById).put(updateCustomer).delete(deleteCustomer);

export default router;