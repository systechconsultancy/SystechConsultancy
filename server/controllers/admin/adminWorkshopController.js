import Workshop from "../../models/Workshop.js";

export const createWorkshop = async (req, res) => {
  try {
    const {
      title,
      mentor,
      maxParticipants,
      fee,
      duration,
      date,
      time,
      mode,
      location,
      whatsAppLink,
      description,
      tags,
      thumbnailUrl,
      status,
    } = req.body;

    if (!title || !mentor || !maxParticipants || !fee || !duration || !date || !time || !mode || !whatsAppLink || !description || !status || !thumbnailUrl) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    if (mode === "Offline" && !location) {
      return res.status(400).json({ error: "Location is required for offline workshops." });
    }

    const tagsArray = Array.isArray(tags) ? tags : [];


    const newWorkshop = new Workshop({
      title,
      mentor,
      maxParticipants,
      fee,
      duration,
      date,
      time,
      mode,
      location: mode === "Offline" ? location : null,
      whatsAppLink,
      description,
      tags: tagsArray,
      thumbnailUrl,
      status,
    });

    await newWorkshop.save();

    res.status(201).json({ ok:true, message: "Workshop created successfully"});
  } catch (error) {
    console.error("Create Workshop Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ date: 1, time: 1 });
    res.status(200).json(workshops);
  } catch (error) {
    console.error("Get All Workshops Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (workshop) {
      res.json(workshop);
    } else {
      res.status(404).json({ message: "Workshop not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (workshop) {
      // Update all fields from the request body
      workshop.title = req.body.title || workshop.title;
      workshop.mentor = req.body.mentor || workshop.mentor;
      workshop.maxParticipants = req.body.maxParticipants || workshop.maxParticipants;
      workshop.fee = req.body.fee || workshop.fee;
      workshop.duration = req.body.duration || workshop.duration;
      workshop.date = req.body.date || workshop.date;
      workshop.time = req.body.time || workshop.time;
      workshop.mode = req.body.mode || workshop.mode;
      workshop.location = req.body.location || workshop.location;
      workshop.whatsAppLink = req.body.whatsAppLink || workshop.whatsAppLink;
      workshop.description = req.body.description || workshop.description;
      workshop.thumbnailUrl = req.body.thumbnailUrl || workshop.thumbnailUrl;
      workshop.status = req.body.status || workshop.status;
      // In a real app, you would also handle updating the tags
      
      const updatedWorkshop = await workshop.save();
      res.json(updatedWorkshop);
    } else {
      res.status(404).json({ message: "Workshop not found" });
    }
  } catch (error) {
    console.error("Update Workshop Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);
    if (workshop) {
      res.json({ ok: true, message: 'Workshop deleted successfully' });
    } else {
      res.status(404).json({ message: 'Workshop not found' });
    }
  } catch (error) {
    console.error("Delete Workshop Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};