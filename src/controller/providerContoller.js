const { sendSuccess, sendError } = require("../middleware/index");
const Admin = require("../model/Admin");
const Provider = require("../model/Provider");

const createProvider = async (req, res, next) => {
  const adminId = req.id;

  try {
    const admin = Admin.findById(adminId);
    if (!admin) {
      return sendError(res, "you are not authorized");
    };
    try {
  req.body.email = req.body.email.toLowerCase();

      const newProvider = new Provider({
        ...req.body,
      });

      await newProvider.save();
      return sendSuccess(res, "successfully create accout", newProvider);
    } catch (error) {
      console.log(error);
      return sendError(res, "unable to create account, please try again later");
    }
  } catch (error) {
    console.log(error);
    return sendError(res, "unable to create account, please try again later");
  }
};

const fetchAllProvider = async (req, res, next) => {
  const { page, pageSize } = req.query;

  page = parseInt(page, 10) || 1;
  pageSize = parseInt(pageSize, 10) || 5;

  try {
    const allProvder = await Provider.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    const data = {
      allProfile: {
        metadata: {
          totalCount: allAnswer[0].metadata[0].totalCount,
          page,
          pageSize,
        },
        data: allProvider[0].data,
      },
    };
    return sendError(res, "successflly fetch all provider", data, allProvider);
  } catch (error) {
    return sendError(
      res,
      "unable to fetch provider data, something went wrong"
    );
  }
};

const updateProvider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedProvider = await Provider.findByIdAndUpdate(id);
    if (!updatedProvider) {
      return sendError(res, "user data does not exist, sign up instead");
    }
    return sendSuccess(res, "updated successfully", updatedProvider);
  } catch (error) {
    console.log(error);
    return sendError(
      res,
      "unable to update provider data, something went wrong"
    );
  }
};

const deleteProvider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProvider = await Provider.findByIdAndDelete(id);
    if (!deletedProvider) {
      return sendError(res, "user data does not exist, sign up instead");
    }
    return sendSuccess(
      res,
      "provider data has been deleted successfully",
      updatedProvider
    );
  } catch (error) {
    console.log(error);
    return sendError(
      res,
      "unable to update provider data, something went wrong"
    );
  }
};

module.exports = {
  createProvider,
  fetchAllProvider,
  updateProvider,
  deleteProvider,
};
