const { sendSuccess, sendError } = require("../middleware/index");
const Appointment = require("../model/Appointment");

const createAppointment = async (req, res, next) => {
    const newProvider = new Appointment({
        ...req.body
    });

    try {
        await newProvider.save();
        return sendSuccess(res, 'successfully create an accout', newProvider);
    } catch (error) {
        console.log(error);
        return sendError(res, 'unable to create account, please try again later');
    }

};

const fetchAllAppointment = async (req, res, next) => {
    let { page, pageSize } = req.query;

    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 5;
  
    try {
        const allAppointment = await Appointment.aggregate([
            {
              $facet: {
                metadata: [{ $count: 'totalCount' }],
                data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
              },
            },
          ]);
  
          const data = {
            allProfile: {
                metadata: { totalCount: allAppointment[0].metadata[0].totalCount, page, pageSize },
                data: allAppointment[0].data,
              },
          };
        return sendError(res, 'successflly fetch all appointment', data, allAppointment)
    } catch (error) {
       return sendError(res, 'unable to fetch appointment data, something went wrong'); 
    }
};


const updateAppointment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, {$set: req.body}, {now: true});
        if(!updatedAppointment){
            return sendError(res, 'user data does not exist, sign up instead')
        };
        return sendSuccess(res, 'updated successfully', updatedAppointment);
    } catch (error) {
       console.log(error);
       return sendError(res, 'unable to update appointment data, something went wrong'); 
    }
};


const deleteAppointment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if(!deletedAppointment){
            return sendError(res, 'user data does not exist, sign up instead')
        };
        return sendSuccess(res, 'appointment data has been deleted successfully', deletedAppointment);
    } catch (error) {
       console.log(error);
       return sendError(res, 'unable to delete appointment data, something went wrong'); 
    }
};

module.exports = {
    createAppointment,
    fetchAllAppointment,
    updateAppointment,
    deleteAppointment
}