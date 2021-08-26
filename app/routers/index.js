const express = require('express');

const router = express.Router();

// Les controllers :
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const watchlistController = require('../controllers/watchlistController');
const watchedMovieController = require('../controllers/watchedMovieController');
const ratingController = require('../controllers/ratingController');
const quizController = require('../controllers/quizController');
const errorController = require('../controllers/errorController');

// Le middleware de vérification du token avant l'accès au route :
const jwtMiddleware = require('../services/jwt');


// Les routes :
router.get('/api/v1/allmovies', movieController.getAllMovies);

router.get('/api/v1/selection/:limit', movieController.movieSelection);

router.post('/api/v1/register', userController.addUser);

router.post('/api/v1/login', userController.userLogged);

router.route('/api/v1/user/:id')
    .get(userController.findUser)
    .patch(jwtMiddleware.authenticateToken, userController.updateUser)
    .delete(jwtMiddleware.authenticateToken, userController.deleteUser);

router.get('/api/v1/user/:id/details', userController.getAllDetails);

router.route('/api/v1/user/:id/watchlist/:movieId')
    .post(jwtMiddleware.authenticateToken, watchlistController.addMovieToWatchlist)
    .patch(jwtMiddleware.authenticateToken, watchlistController.editMovieWatchlist); 

router.route('/api/v1/user/:id/watched/:movieId')
    .post(jwtMiddleware.authenticateToken, watchedMovieController.addWatchedMovie)
    .patch(jwtMiddleware.authenticateToken, watchedMovieController.editWatchedMovie);

router.route('/api/v1/user/:id/rating/movie/:movieId')
    .post(jwtMiddleware.authenticateToken, ratingController.addRating)
    .patch(jwtMiddleware.authenticateToken, ratingController.editRating);

router.get('/api/v1/user/:id/ratings', userController.allRatings);

router.get('/api/v1/user/:id/ratings/movie/:movieId', userController.oneRating);

router.get('/api/v1/movie/:movieId/ratings', movieController.allRatingsMovie);

router.post('/api/v1/quiz', quizController.getAnswersToAQuestion); // Robin, à tester

router.get('/api/v1/searchmovies', quizController.searchMovies); // Anciennement quiz, route de vue. Robin, à tester

router.get('/api/v1/movie/:tmdbId', movieController.movieResult);

router.use(errorController.resourceNotFound);

module.exports = router;