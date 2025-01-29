const { sendSuccess, sendError } = require("../middleware/index");
const Feedback = require("../model/Feedback");
const { fetchAllAppointment } = require("./appointmentController");

const createFeedback = async (req, resizeBy, next) => {
    const newProvider = new Feedback({
        ...req.body
    });

    try {
        await newProvider.save();
        return sendSuccess(res, 'successfully create accout', newProvider);
    } catch (error) {
        console.log(error);
        return sendError(res, 'unable to create account, please try again later');
    }

};

const fetchAllFeedback = async (req, res, next) => {
    const {page, pageSize} = req.query;

    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 5;
  
    try {
        const allFeedback = await Feedback.aggregate([
            {
              $facet: {
                metadata: [{ $count: 'totalCount' }],
                data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
              },
            },
          ]);
  
          const data = {
            allProfile: {
                metadata: { totalCount: allAnswer[0].metadata[0].totalCount, page, pageSize },
                data: allFeedback[0].data,
              },
          };
        return sendError(res, 'successflly fetch all feedback', data, allFeedback)
    } catch (error) {
       return sendError(res, 'unable to fetch feedback data, something went wrong'); 
    }
};

const updateFeedback = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(id);
        if(!updatedFeedback){
            return sendError(res, 'user data does not exist, sign up instead')
        };
        return sendSuccess(res, 'updated successfully', updatedFeedback);
    } catch (error) {
       console.log(error);
       return sendError(res, 'unable to update feedback data, something went wrong'); 
    }
};


const deleteFeedback = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if(!deletedFeedback){
            return sendError(res, 'user data does not exist, sign up instead')
        };
        return sendSuccess(res, 'feedback data has been deleted successfully', deletedFeedback);
    } catch (error) {
       console.log(error);
       return sendError(res, 'unable to update feedback data, something went wrong'); 
    }
};

module.exports = {
    createFeedback,
    fetchAllFeedback,
    updateFeedback,
    deleteFeedback
}