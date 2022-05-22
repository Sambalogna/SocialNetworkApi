const connection = require('../config/connection');
const { User, Thought } = require('../models');
//get methods in data
const {users, thoughts} = require('./data');

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});
    console.log(users, thoughts)
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});