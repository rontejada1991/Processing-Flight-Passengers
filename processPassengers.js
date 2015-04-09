// Processes every passenger, making sure
// that the function being passed returns false for each
function processPassengers(passengers, testFunction) {
	for (var i = 0; i < passengers.length; i++) {
		if (testFunction(passengers[i])) {
			removePassenger(passengers, passengers[i]);
			return false;
		}
	}
	return true;
}

// returns true if Dr. Evel is one of the passenger names
function checkNoFlyList(passenger) {
	return passenger.name === "The Joker";
}

// returns true if the passenger did not pay
function checkNotPaid(passenger) {
	return !passenger.paid;
}

// remove the passenger
function removePassenger(passengers, passenger) {
	var removeIndex = passengers.indexOf(passenger);
	
	// Check that it is a valid index
	// Then remove that index from the array
	if (removeIndex >= 0) {
		passengers.splice(removeIndex, 1);
		return true;
	}
	// Return false if nothing was removed
	return false;
}

// prints the passengers info, whether or not they have paid, and type of ticket
function printPassenger(passenger) {
	var message = passenger.name;
	if (passenger.paid === true) {
		message += " has paid and ";
	} else {
		message += " has not paid and ";
	}
	message += "has a " + passenger.ticket + " ticket.";
	document.write(message + "<br>");
	return false;
}

// creates a drink and dinner order function tailored to our customer and assigns it to a local variable, then we can keep calling that function
function serveCustomer(passenger, orderType) {
	var getDrinkOrderFunction = createDrinkOrder(passenger);
	var getDinnerOrderFunction = createDinnerOrder(passenger);
	// get drink order
	if (orderType === "drink") {
		getDrinkOrderFunction();
	} 
	// get dinner order
	else if (orderType === "dinner") {
		getDrinkOrderFunction();
		getDinnerOrderFunction();
	} 
	// show the movie
	else if (orderType === "movie") {
		getDrinkOrderFunction();
	}
}

// creates a drink order function based on the ticket type of our passenger
// and returns it
function createDrinkOrder(passenger) {
	var orderFunction;
	
	if (passenger.ticket === "first class") {
		orderFunction = function() {
			document.write("Hello " + passenger.name + ". Would you like a cocktail or wine?<br>");
		};
	} else if (passenger.ticket === "premium economy") {
		orderFunction = function() {
			document.write("Hello " + passenger.name + ". Would you like wine, cola or water?<br>");
		};
	} else if (passenger.ticket === "coach") {
		orderFunction = function() {
			document.write("Hello " + passenger.name + ". Would you like a cola or water?<br>");
		};
	}
	return orderFunction;
}

// creates a dinner order function based on the ticket type of our passenger
// and returns it
function createDinnerOrder(passenger) {
	var orderFunction;
	
	if (passenger.ticket === "first class") {
		orderFunction = function() {
			document.write("Would you like chicken or pasta?<br>");
		};
	} else if (passenger.ticket === "premium economy") {
		orderFunction = function() {
			document.write("Would you like a snack box or a cheese plate?<br>");
		};
	} else if (passenger.ticket === "coach") {
		orderFunction = function() {
			document.write("Would you like peanuts or pretzels?<br>");
		};
	}
	
	return orderFunction;
}

// serves every passengers based on what order type the plane is serving currently
function servePassengers(passengers, orderType) {
	document.write("&#8811 Serving Passengers ... <br>");
	for (var i = 0; i < passengers.length; i++) {
		serveCustomer(passengers[i], orderType);
	}
	document.write("<br>");
}

// Array object containing our passenger objects
var passengers = [ { name: "Bruce Wayne", paid: true, ticket: "first class" },
				   { name: "The Joker", paid: true, ticket: "first class" },
				   { name: "Eobard Thawne", paid: false, ticket: "first class" },
				   { name: "Diana Prince", paid: true, ticket: "premium economy" },
				   { name: "Ronald Tejada", paid: true, ticket: "premium economy" },
				   { name: "Clark Kent", paid: true, ticket: "coach" } ]

document.write("&#8811 Printing Passengers ...<br>"); 				   
processPassengers(passengers, printPassenger);
document.write("<br>");
	   
var allCanFly = processPassengers(passengers, checkNoFlyList);
if (!allCanFly) {
	document.write("&#8811 Checking who is on the No Fly List ...<br>"); 
	document.write("The plane can't take off: we have a passenger on the no-fly-list.<br><br>");
}

var allPaid = processPassengers(passengers, checkNotPaid);
if (!allPaid) {
	document.write("&#8811 Checking who has paid ...<br>"); 
	document.write("The plane can't take off: not everyone has paid.<br><br>");
}

document.write("&#8811 Printing Passengers ...<br>"); 
processPassengers(passengers, printPassenger);
document.write("<br>");

servePassengers(passengers, "drink");
servePassengers(passengers, "dinner");
servePassengers(passengers, "movie");