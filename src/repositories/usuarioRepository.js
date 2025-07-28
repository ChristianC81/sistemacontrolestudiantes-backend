const { db } = require('../config/connection_db');
const User = require('../models/userModel');

class UserRepository {
  async findAll() {
    return await User.find();
  }
  
  async findByUsername(username) {
    return await User.findOne({ username });
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id) {
    return await User.findById(id);
  }
  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }
  
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

}

module.exports = new UserRepository();
