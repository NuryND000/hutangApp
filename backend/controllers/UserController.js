import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
// get user berdasarjan id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// buat user  baru
export const saveUser = async (req, res) => {
    const {name, password} = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    try {
        await User.create({
name,
password: passwordHash,
        });
        res.status(201).json({msg:"Data Berhasil Ditambahkan"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// update user 
export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// update user hapus
export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const Login = async (req, res) => {
    try {
      const users = await User.find({ name: req.body.name });
      if (!users.length) return res.status(404).json({ msg: "Nama Tidak Ditemukan" });
      const match = await bcrypt.compare(req.body.password, users[0].password);
      if (!match) return res.status(400).json({ msg: "Password Salah" });
  
      const user = users[0];
      const accessToken = jwt.sign(
        {
          userId: user._id,
          name: user.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "20s",
        }
      );
      const refreshToken = jwt.sign(
        {
          userId: user._id,
          name: user.name,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      await User.updateOne({ _id: user._id }, { refresh_token: refreshToken });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true  // Uncomment if using https
      });
      res.json({ accessToken });
    } catch (error) {
      res.status(404).json({ msg: "Nama Tidak Ditemukan" });
    }
  };
  
  export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.find({ refresh_token: refreshToken });
    if (!user.length) return res.sendStatus(204);
    const userId = user[0]._id;
    await User.updateOne({ _id: userId }, { refresh_token: null });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  };