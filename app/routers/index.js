const express = require('express');

const router = express.Router();

// J'importe mes controllers :
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const watchlistController = require('../controllers/watchlistController');
const watchedMovieController = require('../controllers/watchedMovieController');
const ratingController = require('../controllers/ratingController');
const quizController = require('../controllers/quizController');

// S'il y a des validations et schémas de validation on les exporte ici, comme les controllers :
// ...

const jwtMiddleware = require('../services/jwt');

// Si on veut stocker des infos en cache avec redis pour renvoyer des infos plus rapidement, on peut require redis ici et lui indiquer diverses choses :
// host, port, auth_pass, prefix, expire ..
// Puis on require le middleware de gestion du cache (qui sera dans services), et ensuite on glisse le middleware avant le controller dans l'appel des routes, TADA !


//! Les routes :

// Routes pour trouver un film via son tmdbID, avec ses tags :
router.get('/api/v1/movie/:tmdbId', movieController.movieResult);

// Route pour trouver tous les films suivant des critères :
router.get('/api/v1/searchmovies', quizController.searchMovies); // Anciennement quiz, route de vue. Robin, à tester

// Route pour récupérer toutes les questions du quiz :
router.post('/api/v1/quiz', quizController.getAnswersToAQuestion); // Robin, à tester

// Route pour récupérer TOUS les films de la base de données :
router.get('/api/v1/allmovies', movieController.getAllMovies);

// Rooute pour ajouter un user :
router.post('/api/v1/register', userController.addUser);

// Route pour qu'un utilisateur se connecte :
router.post('/api/v1/login', userController.userLogged);

// Routes pour trouver un utilisateur et pour le supprimer :
router.get('/api/v1/user/:id', userController.findUser); 
router.delete('/api/v1/user/:id', jwtMiddleware.authenticateToken, userController.deleteUser); //! EN COURS

//! Middleware OK
// Route pour modifier des infos du user :
router.patch('/api/v1/user/:id', jwtMiddleware.authenticateToken, userController.updateUser);


// Route pour obtenir tous les détails d'un utilisateur, ainsi que toutes les infosde s films présents dans sa watchlist :
router.get('/api/v1/user/:id/details', userController.getAllDetails);

// Route pour consulter les films présents dans la watchlist d'un utilisateur :
router.get('/api/v1/user/:id/watchlist', userController.userWatchlist);

// Route pour ajouter un film à la watchlist :
router.post('/api/v1/user/:id/watchlist/:movieId', watchlistController.addMovieToWatchlist);

// Route pour modifier des infos d'un film de la watchlist (l'enlever, le rajouter) :
router.patch('/api/v1/user/:id/watchlist/:movieId', watchlistController.editMovieWatchlist); 

// Route pour indiquer qu'un film a été vu : 
router.post('/api/v1/user/:id/watched/:movieId', watchedMovieController.addWatchedMovie);

// Route pour modifier les films watched (ajouter/enlever) :
router.patch('/api/v1/user/:id/watched/:movieId', watchedMovieController.editWatchedMovie);

// Route pour afficher les films ayant été vu par l'utilisateur : 
router.get('/api/v1/user/:id/watched', userController.userWatchedMovie);

// Route pour afficher les infos des films que l'utilisateur a noté + les notes données of course :
router.get('/api/v1/user/:id/ratings', userController.allRatings);
// Route pour afficher le film et la note correspondante donné par un utilisateur :
router.get('/api/v1/user/:id/ratings/movie/:movieId', userController.oneRating); //! OK -> Pour l'instant 1 utilisateur peut noter plusieurs fois le même film .. A voir avec la route des notes, plus tard donc !
// Route pour afficher toutes les notes d'un même film :
router.get('/api/v1/movie/:movieId/ratings', movieController.allRatingsMovie);
// Route pour afficher les films selon la moyenne de leurs notes par ordre décroissant, avec en paramètre le nombre de films que je souhaite afficher : :
router.get('/api/v1/selection/:limit', movieController.movieSelection);

// Route pour ajouter une note à un film (crée donc une relation entre l'utilisateur et le film):
router.post('/api/v1/user/:id/rating/movie/:movieId', ratingController.addRating);
// Route pour modifier la note qu'un utilisateur connecté é donné à un film :
router.patch('/api/v1/user/:id/rating/movie/:movieId', ratingController.editRating);


module.exports = router;