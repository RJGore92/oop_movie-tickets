function TicketList() {
  this.ticketsGiven = [],
  this.currentTicket = 0
}

TicketList.prototype.giveTicket = function(ticket) {
  ticket.ticketNumber = this.assignTicket();
  this.ticketsGiven.push(ticket);
}

TicketList.prototype.assignTicket = function() {
  this.currentTicket += 1;
  return this.currentTicket;
}

TicketList.prototype.readTicket = function(ticketID) {
  for (var i = 0; i < this.ticketsGiven.length; i++) {
    if (this.ticketsGiven[i]) {
      if (this.ticketsGiven[i].ticketNumber == ticketID) {
        return this.ticketsGiven[i];
      }
    }
  };
  return false;
}

TicketList.prototype.deleteTicket = function(ticketID) {
  for (var i = 0; i < this.ticketsGiven.length; i++) {
    if (this.ticketsGiven[i]) {
      if (this.ticketsGiven[i].ticketNumber == ticketID) {
        delete this.ticketsGiven[i];
        return true;
      }
    }
  };
  return false;
}

var currentTicketList = new TicketList();


function MovieList() {
  this.availableMovies = [],
  this.availableMovieCount = 0
}

MovieList.prototype.addMovieToList = function (movie) {
  movie.movieID = this.assignMovieID();
  this.availableMovies.push(movie);
};

MovieList.prototype.assignMovieID = function () {
  this.availableMovieCount += 1;
  return this.availableMovieCount;
};

MovieList.prototype.findMovie = function (movieNumber) {
  for (var i = 0; i < this.availableMovies.length; i++) {
    if(this.availableMovies[i]) {
      if (this.availableMovies[i].movieID == movieNumber) {
        return this.availableMovies[i];
      }
    }
  };
  return false;
};

MovieList.prototype.removeMovie = function (movieNumber) {
  for (var i = 0; i < this.availableMovies.length; i++) {
    if(this.availableMovies[i]) {
      if (this.availableMovies[i].movieID == movieNumber) {
        delete this.availableMovies[i];
        return true;
      }
    }
  };
  return false;
};

MovieList.prototype.appendToList = function () {
  var movieListToAppend = this.availableMovies;
  var movieIDFocus = 0;
  movieListToAppend.forEach(function(movie) {
    movieIDFocus += 1;
    $("select#movie-selector").append("<option value='"+movieIDFocus+"'>"+movie.name+" ("+movie.rating+")");
  });
};

var currentMovieList = new MovieList();

function Movie(name, releaseYear, rating) {
  this.name = name,
  this.releaseYear = releaseYear,
  this.rating = rating
}

Movie.prototype.ratingSafeAge = function () {
  var ratingAgeCheck = this.rating;
  var ratingToLower = ratingAgeCheck.toLowerCase();
  console.log(ratingToLower);
  var minAge = 0;
  if (ratingToLower == "g") {
    return minAge;
  }
  else if (ratingToLower == "pg") {
    minAge = 7;
    return minAge;
  }
  else if (ratingToLower == "pg-13") {
    minAge = 13;
    return minAge;
  }
  else {
    minAge = 21;
    return minAge;
  }
};

var movieOne = new Movie("TestMovieA", 2015, "G");
var movieTwo = new Movie("TestMovieB", 2012, "PG-13");
var movieThree = new Movie("TestMovieC", 2019, "R");

function Ticket(selectedMovie, viewerAge) {
  this.selectedMovie = selectedMovie,
  this.viewerAge = viewerAge
  //this.movieTime = movieTime
}

Ticket.prototype.determineSafeToView  = function () {
  var ageCheck = this.viewerAge;
  var warningRating = 0;
  if (this.selectedMovie) {
    var movieAgeCheck = this.selectedMovie.ratingSafeAge();
    if (movieAgeCheck > ageCheck) {
      alert("The movie you bought a ticket for doesn't appear to be safe for your age, even with supervision. We suggest that you look into a different movie.");
      warningRating = 2;
    }
    else if (movieAgeCheck == ageCheck) {
      alert("This movie appears to be barely suitable for your age.  Be aware that some subjects of this movie be inappropriate for you.");
      warningRating = 1;
    }
    else {
      alert("This movie is suitable for your age.  Grab your snacks, then sit back and enjoy the show.");
    }
  }
  return warningRating;
};

function confirmPurchase(ticket) {
  var pendingTicketID = currentTicketList.currentTicket + 1;
  var movieToTarget = ticket.selectedMovie;
  var checkWarning = ticket.determineSafeToView();
  if (checkWarning == 2) {
    return false;
  }
  else if (checkWarning == 1) {
    return confirm("Are you sure that you wish to view this movie?");
  }
  else {
    return true;
  }
}

$(document).ready(function() {
  var movieTicketsPurchased = 0;
  var movieTicketRows = 0;
  currentMovieList.addMovieToList(movieOne);
  currentMovieList.addMovieToList(movieTwo);
  currentMovieList.addMovieToList(movieThree);
  currentMovieList.appendToList();
  $("form#ticket-giver").submit(function(event) {
    event.preventDefault();
    var movieSelected = currentMovieList.findMovie($("select#movie-selector").val());
    console.log(movieSelected);
    var ageOfAttendee = $("input#viewer-age-input").val();
    var pendingTicket = new Ticket(movieSelected, ageOfAttendee);
    var purchaseConfirmation = confirmPurchase(pendingTicket);
    $("input#viewer-age-input").val("0");
    if (purchaseConfirmation) {
      currentTicketList.giveTicket(pendingTicket);
      if ((movieTicketsPurchased % 4) == 0 || movieTicketsPurchased == 0) {
        movieTicketRows += 1;
        $("div#output-div").append("<div id='ticket-row"+movieTicketRows+"'></div>");
      }
      movieTicketsPurchased += 1;
      $("div#ticket-row"+movieTicketRows).append(
        "<div class='ticket-display col-md-3' id='ticket"+movieTicketsPurchased+"'>" +
          "<h6>"+pendingTicket.selectedMovie.name+"</h6>" +
          "<p>Rating: <span id='ticket-rating"+movieTicketsPurchased+"'></span></p>" +
          "<p>Year of Release: <span id='ticket-year"+movieTicketsPurchased+"'></span></p>"+
        "</div>"
      );
      $("span#ticket-rating"+movieTicketsPurchased).text(pendingTicket.selectedMovie.rating);
      $("span#ticket-year"+movieTicketsPurchased).text(pendingTicket.selectedMovie.releaseYear);
    }
    else {
      return false;
    }
  });
});
