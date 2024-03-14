import Fruits from "../models/fruitsModel.js";

export const home = async (req, res) => {
  try {
    const fruits = await Fruits.find({}).limit(22);
    res.render("frmanager", { fruits });
  } catch (error) {
    console.log(error);
  }
};
// Tạo fruits mới
export const createFruits = async (req, res) => {
  try {
    const fruitsData = new Fruits(req.body);
    const { name } = fruitsData;
    const fruitsExists = await Fruits.findOne({ name });

    if (fruitsExists) {
      return res.status(400).json({
        error: "Fruits already exists",
      });
    }

    const saveFruits = await fruitsData.save();
    res.status(201).json({
      status: "200",
      message: "Fruits created successfully",
      data: saveFruits,
    });
  } catch (error) {
    console.error("Error creating fruits:", error);
    res.status(500).json({
      status: "500",
      error: "Internal server error",
    });
  }
};

// Lấy tất cả fruits
export const fetchFruits = async (req, res) => {
  try {
    const fruits = await Fruits.find();
    if (fruits.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No fruits found",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Get all fruits successfully",
      data: fruits,
    });
  } catch (error) {
    console.error("Error fetching fruits:", error);
    res.status(500).json({
      status: "500",
      error: "Internal server error",
    });
  }
};

// Cập nhật thông tin fruits
export const updateFruits = async (req, res) => {
  try {
    const id = req.params.id;
    const fruitsExist = await Fruits.findById(id);
    if (!fruitsExist) {
      return res.status(404).json({
        status: "404",
        message: "Fruits not found.",
      });
    }
    const updatedFruits = await Fruits.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "200",
      message: "Fruits updated successfully",
      data: updatedFruits,
    });
  } catch (error) {
    console.error("Error updating fruits:", error);
    res.status(500).json({
      status: "500",
      error: "Internal Server Error.",
    });
  }
};

// Xóa fruits api controller
export const deleteFruits = async (req, res) => {
  try {
    const id = req.params.id;
    const fruitsExist = await Fruits.findById(id);
    if (!fruitsExist) {
      return res.status(404).json({ message: "Fruits not found." });
    }
    await Fruits.findByIdAndDelete(id);
    res.status(200).json({ message: "Fruits deleted successfully" });
  } catch (error) {
    console.error("Error deleting fruits:", error);
    res.status(500).json({
      status: "500",
      error: "Internal Server Error.",
    });
  }
};
