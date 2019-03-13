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


function Movie(name, releaseYear, rating) {
  this.name = name,
  this.releaseYear = releaseYear,
  this.rating = rating

}

//MovieList.prototype.determinePriceFactor  = function () {
//
//};
