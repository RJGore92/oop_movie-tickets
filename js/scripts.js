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
    $("select#movie-selector").append("<option value='"+movieIDFocus+"'>"+movie.name+" ("+movie.rating+")</option>");
  });
};

var currentMovieList = new MovieList();

function Movie(name, releaseYear, rating, times, prices) {
  this.name = name,
  this.releaseYear = releaseYear,
  this.rating = rating,
  this.times = times,
  this.prices = prices
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

Movie.prototype.findPricesList = function () {
  return this.prices;
};

var movieOne = new Movie("TestMovieA", 2015, "G", ["12:30 PM", "3:30 PM", "5:45 PM", "8:45 PM"], [["$11.00", "$11.50", "$11.00"], ["$11.00", "$14.00", "$11.00"]]);
var movieTwo = new Movie("TestMovieB", 2012, "PG-13", ["1:45 PM", "4:45 PM", "7:30 PM", "9:30 PM"], [["$10.00", "$10.50", "10.00"], ["$10.00", "$13.00", "$10.00"]]);
var movieThree = new Movie("TestMovieC", 2019, "R", ["2:15 PM", "5:15 PM", "8:00 PM"], [["$12.50", "$13.00", "$12.50"], ["$12.50", "$16.00", "$12.50"]]);

function Ticket(selectedMovie, viewerAge, movieTime) {
  this.selectedMovie = selectedMovie,
  this.viewerAge = viewerAge,
  this.movieTime = movieTime
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

function findActiveMovieSelection() {
  return currentMovieList.findMovie($("select#movie-selector").val());
}

function advanceForm() {
  $("select#movie-times").empty();
  var movieToRead = findActiveMovieSelection();
  console.log(movieToRead);
  var timeHour = 0;
  movieToRead.times.forEach(function(time) {
    var timeSplit = time.split(":");
    console.log(timeSplit);
    var timeFocus = timeSplit[0];
    if (timeFocus == "12") {
      timeHour = 0;
      $("select#movie-times").append("<option value='"+timeHour+"'>"+time+"</option>");
    }
    else {
      timeHour = timeFocus[0];
      $("select#movie-times").append("<option value='"+timeHour+"'>"+time+"</option>");
    }
  });
  $("div#form-stage-one").slideToggle();
  $("div#form-stage-two").slideToggle();
}


function printTime(timeVar) {
  var movieSelected = findActiveMovieSelection();
  var timesToRead = movieSelected.times;
  var movieTimeVars = [];
  timesToRead.forEach(function(time) {
    var timeSplit = time.split(":");
    var timeFocus = timeSplit[0];
    movieTimeVars.push(timeFocus);
  });
  var targetTimeToRead = timeVar;
  if(timeVar == 0){
    timeVar = 12;
  }
  for (var i = 0; i < movieTimeVars.length; i++) {
    if (timeVar == movieTimeVars[i]) {
      return movieSelected.times[i];
    }
  }
  return false;
}

function revertForm() {
  $("select#movie-times").empty();
  $("div#form-stage-one").slideToggle();
  $("div#form-stage-two").slideToggle();
}

function submitToOutput() {
  $("div#form-stage-two").slideToggle();
  $("div.ticket-form").slideToggle();
  $("div#reset-button").slideToggle();
}

function resetForm() {
  $("select#movie-times").empty();
  $("div#reset-button").slideToggle();
  $("div#form-stage-one").slideToggle();
  $("div.ticket-form").slideToggle();
}

function printTicketTypeAndPrice(movieTarget, ticketNum, time, age) {
  var movieToScan = movieTarget;
  // var moviePrices =
  console.log(movieToScan);
  var timeToRead = time;
  var ticketCounter = ticketNum;
  var ageToRead = age;
  var pricesToRead = [];
  var finalPrice = "";
  var movieTicketType = "";
  if (timeToRead >= 4) {
    pricesToRead = movieToScan.prices[1];
    console.log(pricesToRead);
    if (ageToRead < 11) {
      movieTicketType = "Prime Time, Child's Ticket";
      finalPrice = pricesToRead[0];
    }
    if (ageToRead >= 60) {
      movieTicketType = "Prime Time, Senior's Ticket";
      finalPrice = pricesToRead[2];
    }
    else {
      movieTicketType = "Prime Time, Adult's Ticket";
      finalPrice = pricesToRead[1];
    }
  }
  else {
    pricesToRead = movieToScan.prices[0];
    if (ageToRead < 11) {
      movieTicketType = "Matinee, Child's Ticket";
      finalPrice = pricesToRead[0];
    }
    if (ageToRead >= 60) {
      movieTicketType = "Matinee, Senior's Ticket";
      finalPrice = pricesToRead[2];
    }
    else {
      movieTicketType = "Matinee, Adult's Ticket";
      finalPrice = pricesToRead[1];
    }
  }
  $("span#ticket-type"+ticketCounter).text(movieTicketType);
  $("span#ticket-cost"+ticketCounter).text(finalPrice);
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
    submitToOutput();
    var movieSelected = currentMovieList.findMovie($("select#movie-selector").val());
    console.log(movieSelected);
    var ageOfAttendee = $("input#viewer-age-input").val();
    var timeSelected = $("select#movie-times").val();
    var pendingTicket = new Ticket(movieSelected, ageOfAttendee, timeSelected);
    var purchaseConfirmation = confirmPurchase(pendingTicket);
    $("input#viewer-age-input").val("0");
    if (purchaseConfirmation) {
      currentTicketList.giveTicket(pendingTicket);
      movieTicketsPurchased++;
      if (((movieTicketsPurchased - 1) % 2) == 0 || (movieTicketsPurchased - 1) == 0) {
        movieTicketRows += 1;
        $("div#output-div").append("<div class='row' id='ticket-row"+movieTicketRows+"'></div>");
      }
      console.log(movieTicketsPurchased);
      $("div#ticket-row"+movieTicketRows).append(
        "<div class='col-sm ticket-display' id='ticket"+movieTicketsPurchased+"'>" +
          "<h6>"+pendingTicket.selectedMovie.name+"</h6>" +
          "<p>Rating: <span id='ticket-rating"+movieTicketsPurchased+"'></span></p>" +
          "<p>Year of Release: <span id='ticket-year"+movieTicketsPurchased+"'></span></p>"+
          "<p>Movie Time: <span id='ticket-time"+movieTicketsPurchased+"'></span></p>"+
          "<p>Movie Type: <span id='ticket-type"+movieTicketsPurchased+"'></span></p>"+
          "<p>Ticket Cost: <span id='ticket-cost"+movieTicketsPurchased+"'></span></p>"+
        "</div>"
      );
      $("span#ticket-rating"+movieTicketsPurchased).text(pendingTicket.selectedMovie.rating);
      $("span#ticket-year"+movieTicketsPurchased).text(pendingTicket.selectedMovie.releaseYear);
      $("span#ticket-time"+movieTicketsPurchased).text(printTime(timeSelected));
      printTicketTypeAndPrice(movieSelected, movieTicketsPurchased, timeSelected, ageOfAttendee);
    }
    else {
      return false;
    }
  });
});
