import userModel from "../models/user.js";
class userController {
  static createUser = async (req, res) => {
    const { name, email, age } = req.body;
    const { filename } = req.file;

    try {
      if (name && email && age && filename) {
        const newUser = new userModel({
          name: name,
          email: email,
          age: age,
          profile: filename,
        });
        const new_user = await newUser.save();
        if (new_user) {
          return res.status(200).json(newUser);
        } else {
          return res.status(400).json({ message: "Something went wrong" });
        }
      } else {
        return res.status(400).json({ message: "all fields are required" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };
  static getAllUser = async (req, res) => {
    try {
      const allUsers  = await userModel.find({});
      if(allUsers){
        return res.status(200).json(allUsers)
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };
}

export default userController;
