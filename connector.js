const { mongoose } = require("mongoose");

const connect = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://vahabs:Svahab3101@cluster0.jb9arqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connection Successfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
