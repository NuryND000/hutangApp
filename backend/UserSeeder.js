import mongoose from "mongoose";
import User from "./models/UserModel.js";
import bcrypt from "bcrypt";

// Data user untuk di-seed
const userData = [
  { name: "admin", password: "admin" },
  // Tambahkan data lainnya sesuai kebutuhan
];

mongoose
  .connect("mongodb://127.0.0.1:27017/hutangApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database connected");

    for (const user of userData) {
      // Cek apakah user dengan nama yang sama sudah ada di database
      const existingUser = await User.findOne({ name: user.name });

      if (!existingUser) {
        // Jika tidak ada, buat user baru
        const { name, password } = user;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        await User.create({
          name,
          password: passwordHash,
        });
        console.log(`User ${user.name} created`);
      } else {
        console.log(`User ${user.name} already exists, skipping`);
      }
    }

    mongoose.connection.close();
    console.log("Database connection closed");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
