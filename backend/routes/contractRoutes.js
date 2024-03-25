import express from 'express';
import {createContract, getContracts, getContractByFreelancer, getContractByHirer, getContractById } from '../controllers/contractController.js';
const router = express.Router();

router.post('/psuedoContract', createContract)
router.get('/getContracts', getContracts)
router.get('/getContractById/:contractId', getContractById)
router.get('/freelancer/:freelancerId', getContractByFreelancer)
router.get('/hirer/:hirerId', getContractByHirer)

export default router;
