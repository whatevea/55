import Contract from '../models/contract.js';

export const createContract = async (req, res) => {
    try {
        const { employee, hirer, job, start_date } = req.body;

        const contract = new Contract({
            employee,
            hirer,
            job,
            start_date,
            status: 'Not Started'
        });

        await contract.save();

        res.status(201).json(contract);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getContracts = async (req, res) => {
    try {
        const contracts = await Contract.find().populate('employee').populate('hirer').populate('job');

        res.status(200).json(contracts);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//get contract by freelancer's user_id 
export const getContractByFreelancer = async (req, res) => {
    try {
    const { freelancerId } = req.params;

    const contract = await Contract.find({employee: freelancerId}).populate('employee').populate('hirer').populate('job');

    if(!contract) {
      return res.status(404).json({message: "Contract not found"});
    }

    res.status(200).json(contract);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
 
//get contract by hirer's user id
export const getContractByHirer = async (req, res) => {
    try {
    const { hirerId } = req.params;

    const contract = await Contract.find({hirer: hirerId}).populate('employee').populate('hirer').populate('job');

    if(!contract) {
      return res.status(404).json({message: "Contract not found"});
    }

    res.status(200).json(contract);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
