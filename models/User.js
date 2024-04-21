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
      minLength: 3,
      require: [true, 'please enter your name'],
    },

    age: {
      type: Number,
      min: 10,
      max: 50,
      require: [true, 'please add a number'],
    },

    email: {
      type: String,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
