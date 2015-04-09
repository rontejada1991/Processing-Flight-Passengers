// Processes every passenger, making sure
// that the function being passed returns false for each
function processPassengers(passengers, testFunction) {
	document.write("&#8811 <br>");
	for (var i = 0; i < passengers.length; i++) {
		if (testFunction(passengers[i])) {
			return false;
		}
	}
	return true;
}

// returns true if Dr. Evel is one of the passenger names
function checkNoFlyList(passenger) {
	return passenger.name === "Dr. Evel";
}

// returns true if the passenger did not pay
function checkNotPaid(passenger) {
	return !passenger.paid;
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
		getDrinkOrderFunction();
	} 
	// show the movie
	else if (orderType === "movie") {
		getDrinkOrderFunction();
	}
}

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

function servePassengers(passengers) {
	document.write("&#8811 <br>");
	for (var i = 0; i < passengers.length; i++) {
		serveCustomer(passengers[i], "drink");
	}
	document.write("&#8811 <br>");
	for (var i = 0; i < passengers.length; i++) {
		serveCustomer(passengers[i], "dinner");
	}
	document.write("&#8811 <br>");
	for (var i = 0; i < passengers.length; i++) {
		serveCustomer(passengers[i], "movie");
	}
	document.write("&#8811 <br>");
}

var passengers = [ { name: "Jane Doloop", paid: true, ticket: "coach" },
				   { name: "Dr. Evel", paid: true, ticket: "premium economy" },
				   { name: "Sue Property", paid: false, ticket: "first class" },
				   { name: "John Funcall", paid: true, ticket: "coach" } ]			

var allCanFly = processPassengers(passengers, checkNoFlyList);
if (!allCanFly) {
	document.write("&#8811 The plane can't take off: we have a passenger on the no-fly-list.<br>");
}

var allPaid = processPassengers(passengers, checkNotPaid);
if (!allPaid) {
	document.write("&#8811 The plane can't take off: not everyone has paid.<br>");
}

processPassengers(passengers, printPassenger);
servePassengers(passengers);