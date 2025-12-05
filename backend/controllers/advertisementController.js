import Advertisement from "../models/Advertisement.js";

// Upload new advertisement image
export const addAdvertisement = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;
    if (!imageUrl) return res.status(400).json({ message: "Image required" });

    const ad = await Advertisement.create({ imageUrl });
    res.status(201).json({ message: "Advertisement added", ad });
  } catch (error) {
    console.error("Add ad error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all advertisements
export const getAdvertisements = async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an advertisement
export const deleteAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Advertisement not found" });
    await ad.deleteOne();
    res.json({ message: "Advertisement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
