const mongoose = require('mongoose');
const Content = require('./models/Content');
const { mockMovies } = require('../src/mockData');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error(err));

// Seed function
const seedDatabase = async () => {
  try {
    await Content.deleteMany({});
    
    const formattedMovies = mockMovies.map(movie => ({
      title: movie.title,
      genre: movie.genre,
      posterURL: movie.posterURL,
      backdropURL: movie.backgroundURL,
      videoURL: movie.videoURL,
      director: movie.director,
      cast: movie.cast,
      description: movie.description,
      releaseDate: new Date(), // Add actual dates
      duration: 120, // Add actual durations
      isFeatured: movie.id === 0, // Mark first movie as featured
      isTrending: true,
      isOriginal: true,
      rating: 8.5
    }));

    await Content.insertMany(formattedMovies);
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();