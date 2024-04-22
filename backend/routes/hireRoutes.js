import express from "express";
import passport from "passport";
import addJob, {
  getApplierList,
  getJobsList,
  getSingleJobPost,
  getJobsListBasedOnHirerUserId,
  getJobsListByCategory,
} from "../controllers/hirerController.js";
import { apply_job } from "../controllers/freelancerController.js";
import { initialize, authenticate } from "../middleware/authUser.js";

const router = express.Router();

router.use(passport.initialize());

router.post("/postJob", authenticate, addJob);
router.get("/postJob", authenticate, getJobsList);
router.get("/postJobByCategory", authenticate, getJobsListByCategory);
router.get(
  "/postJobByHirerUserId/:hirerUserId",
  authenticate,
  getJobsListBasedOnHirerUserId
);
router.get("/singleJobPost/:id", authenticate, getSingleJobPost);
router.post("/applyingforJob", apply_job);
router.get("/getappliers/:id", getApplierList);
export default router;
