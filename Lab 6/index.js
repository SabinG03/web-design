/*
  assignment 6 
  Sabin Ghet - 22499834
  Windows - Google
 */ 

  const express = require("express");
  const mongoose = require("mongoose");
  
  const app = express();
  
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: false })); 
  
 // app.use(express.static("public")); 
  
  mongoose
    .connect(
      "mongodb+srv://admin:admin123@cluster0.2lukpsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ) // Connect to MongoDB 
    .then(() => {
      console.log("Connected to database!");
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      }); // Start the server once connected to the database
    })
    .catch((error) => {
      console.error("Connection failed!", error);
    });
  
  // Parameters
  const gymMemberSchema = new mongoose.Schema({
    id2: {
      type: Number,
    },
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
    premium: {
      type: Boolean,
    },
  });
  
  // Create Gym Member model
  const GymMember = mongoose.model("GymMember", gymMemberSchema);
  
  // Routes for Gym Members
  app
    .route("/api/members")
    .get(async (req, res) => {
      // Get all gym members
      try {
        const gymMembers = await GymMember.find({}).select("-__v");
        res.status(200).json(gymMembers);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    })
    .post(async (req, res) => {
      // Create a new gym member
      try {
        const gymMember = await GymMember.create(req.body);
        res.status(200).json(gymMember);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  
  app
    .route("/api/members/:id2")
    .get(async (req, res) => {
      // Get a gym member by ID2
      try {
        const { id2 } = req.params;
        const gymMember = await GymMember.findOne({ id2 });
        if (!gymMember) {
          return res.status(404).json({ message: "Gym member not found" });
        }
        res.status(200).json(gymMember);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    })
    .put(async (req, res) => {
      // Update a gym member by ID2
      try {
        const { id2 } = req.params;
        const gymMember = await GymMember.findOneAndUpdate({ id2 }, req.body, {
          new: true,
        });
        if (!gymMember) {
          return res.status(404).json({ message: "Gym member not found" });
        }
        res.status(200).json(gymMember);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    })
    .delete(async (req, res) => {
      // Delete a gym member by ID2
      try {
        const { id2 } = req.params;
        const deletedMember = await GymMember.findOneAndDelete({ id2 });
        if (!deletedMember) {
          return res.status(404).json({ message: "Gym member not found" });
        }
        res.status(200).json({ message: "Gym member deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  
  // Parameters
  const gymClassSchema = new mongoose.Schema({
    id2: {
      type: Number,
    },
    class_name: {
      type: String,
    },
    class_day: {
      type: String,
    },
    session_length: {
      type: Number,
    },
    price: {
      type: Number,
    },
    current_members: {
      type: Number,
      default: 0,
    },
  });
  
  // Create Gym Class model
  const GymClass = mongoose.model("GymClass", gymClassSchema);
  
  // Routes for Gym Classes
  app
    .route("/api/class")
    .get(async (req, res) => {
      // Get all gym classes
      try {
        const gymClasses = await GymClass.find({}).select("-__v");
        res.status(200).json(gymClasses);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    })
    .post(async (req, res) => {
      // Create a new gym class
      try {
        const gymClass = await GymClass.create(req.body);
        res.status(200).json(gymClass);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  
  app
    .route("/api/class/:id2")
    .get(async (req, res) => {
      // Get a gym class by ID2
      try {
        const { id2 } = req.params;
        const gymClass = await GymClass.findOne({ id2 });
        if (!gymClass) {
          return res.status(404).json({ message: "Gym class not found" });
        }
        res.status(200).json(gymClass);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    })
    .put(async (req, res) => {
      // Update a gym class by ID2
      try {
        const { id2 } = req.params;
        const gymClass = await GymClass.findOneAndUpdate({ id2 }, req.body, {
          new: true,
        });
        if (!gymClass) {
          return res.status(404).json({ message: "Gym class not found" });
        }
        res.status(200).json(gymClass);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    })
    .delete(async (req, res) => {
      // Delete a gym class by ID2
      try {
        const { id2 } = req.params;
        const deletedClass = await GymClass.findOneAndDelete({ id2 });
        if (!deletedClass) {
          return res.status(404).json({ message: "Gym class not found" });
        }
        res.status(200).json({ message: "Gym class deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  // Parameters
    const memberClassInfoSchema = new mongoose.Schema({
      user_id: {
        type: Number,
      },
      class_id: {
        type: Number,
      },
      class_id2: {
        type: Number,
      },
      class_id3: {
        type: Number,
      },
      id2: {
        type: Number,
      }
    });
    
    // Create Member-Class info model
    const MemberClassInfo = mongoose.model(
      "MemberClassInfo",
      memberClassInfoSchema
    );
    
    // Routes for Member-Class info
    app
      .route("/api/info")
      .get(async (req, res) => {
        // Get all member-class infos
        try {
          const infos = await MemberClassInfo.find({});
          res.status(200).json(infos);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      })
      .post(async (req, res) => {
        // Create a new member-class info
        try {
          const { user_id, class_id, class_id2, class_id3, id2 } = req.body;
          const info = await MemberClassInfo.create({ user_id, class_id, class_id2, class_id3, id2 });
          res.status(200).json(info);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
    
      app
      .route("/api/info/:id2")
      .get(async (req, res) => {
        // Get a member-class info by id2
        try {
          const { id2 } = req.params;
          const info = await MemberClassInfo.findOne({ id2 });
          if (!info) {
            return res.status(404).json({ message: "Info not found" });
          }
          res.status(200).json(info);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      })
      .put(async (req, res) => {
        // Update a member-class info by id2
        try {
          const { id2 } = req.params;
          const info = await MemberClassInfo.findOneAndUpdate(
            { id2 },
            req.body,
            { new: true }
          );
          if (!info) {
            return res.status(404).json({ message: "Info not found" });
          }
          res.status(200).json(info);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      })
      .delete(async (req, res) => {
        // Delete a member-class info by id2
        try {
          const { id2 } = req.params;
          const deletedInfo = await MemberClassInfo.findOneAndDelete({ id2 });
          if (!deletedInfo) {
            return res.status(404).json({ message: "Info not found" });
          }
          res.status(200).json({ message: "Info deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
  module.exports = app;
  