import Test from "../models/testModel.js";

export const getAllForUser = async (req, res) => {
    const postedBy = req.user._id;
    try {
        const t = await Test.find({ postedBy }).populate({
            path: 'postedBy',
            select: '-password'
        }).sort({ createdAt: -1 });
        res.status(200).json(t);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const getAllForAdmin = async (req, res) => {
    // const postedBy = req.user._id;
    try {
        const t = await Test.find({ }).populate({
            path: 'postedBy',
            select: '-password'
        }).sort({ createdAt: -1 });
        res.status(200).json(t);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export const post = async (req, res) => {
    const postedBy = req.user._id;
    const { test } = req.body;
    try {
        const t = await Test.create({ test, postedBy });
        res.status(200).json(t);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}
