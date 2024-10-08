const URL = require("../models/url.model");
const { default: mongoose } = require("mongoose");

const handleGetAllUrls = async (req, res, next) => {
   // const userId = new ObjectId(req.user._id);
   const userId = mongoose.Types.ObjectId.createFromHexString(req.user._id);

   try {
      const urls = await URL.aggregate([
         {
            $match: {
               createdBy: userId,
            },
         },
         {
            $lookup: {
               from: "visitdetails",
               localField: "shortId",
               foreignField: "shortId",
               as: "visitDetails",
            },
         },
         {
            $addFields: {
               visitCount: { $size: "$visitDetails" },
            },
         },
         {
            $project: {
               shortId: 1,
               redirectURL: 1,
               createdBy: 1,
               createdAt: 1,
               visitCount: 1,
            },
         },
      ]);

      return res.status(200).json({ urls });
   } catch (error) {
      console.error(error);
      next(error);
   }
};

module.exports = {
   handleGetAllUrls,
};
