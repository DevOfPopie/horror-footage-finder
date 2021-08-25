import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';

import './moviebuttons.scss';

import { updateQuizResultIndex } from '../../actions/movies';

export const MovieButtons = ({
  format, quizResults, resultsLength, currentIndex, updateResultsIndex,
}) => (
  <div className="movie-buttons">
    <Button textContent="Déjà vu" />
    <Button textContent="Ajouter à ma liste" />
    {/* Affichage conditionnel si le format = full seulement */}
    {format === 'full' && (
      <>
        {/* Si le currentIndex dépasse le nombre de résultats, on n'affiche pas le bouton */}
        {currentIndex < resultsLength - 1 && (
        <Button
          to={`/movie/${quizResults[currentIndex + 1]}`}
          onClick={updateResultsIndex}
          textContent="Autre résultat"
        />
        )}
        <Button to="/quiz" textContent="Relancer le quiz" />
      </>
    )}
  </div>
);

MovieButtons.propTypes = {
  format: PropTypes.string.isRequired,
  quizResults: PropTypes.arrayOf(PropTypes.number).isRequired,
  resultsLength: PropTypes.number.isRequired,
  updateResultsIndex: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({
  movies: {
    quizResults: {
      tmdbIDs: quizResults,
      currentIndex,
    },
  },
}) => ({
  quizResults,
  resultsLength: quizResults.length,
  currentIndex,
});

const mapDispatchToProps = (dispatch) => ({
  updateResultsIndex: () => dispatch(updateQuizResultIndex()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons);
