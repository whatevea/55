import express from "express";
import addJob, {
  getApplierList,
  getJobsList,
  getSingleJobPost,
  getJobsListBasedOnHirerUserId,
  getJobsListByCategory,
} from "../controllers/hirerController.js";
import { apply_job } from "../controllers/freelancerController.js";

const router = express.Router();
router.post("/postJob", addJob);
router.get("/postJob", getJobsList);
router.get("/postJobByCategory", getJobsListByCategory);
router.get("/postJobByHirerUserId/:hirerUserId", getJobsListBasedOnHirerUserId);
router.get("/singleJobPost/:id", getSingleJobPost);
router.post("/applyingforJob", apply_job);
router.get("/getappliers/:id", getApplierList);
export default router;
