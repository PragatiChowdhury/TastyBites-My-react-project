import MenuItem from "../models/MenuItem.js";

export const getMenuItems = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (category && category !== "All") filter.category = category;

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Invalid menu item id" });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create({
      ...req.body,
      price: Number(req.body.price),
      availability: req.body.availability !== false && req.body.availability !== "false"
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.body.price !== undefined ? { price: Number(req.body.price) } : {}),
        ...(req.body.availability !== undefined
          ? { availability: req.body.availability === true || req.body.availability === "true" }
          : {})
      },
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid menu item id" });
  }
};
