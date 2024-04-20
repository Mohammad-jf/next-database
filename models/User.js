import mongoose, { models } from 'mongoose';

// const userSchema = new Schema({
//   name: String,
// });

// const User = models.User || model('User', userSchema);

// export default User;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'please enter your name'],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
