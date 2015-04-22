
function getMyOcean() {
	// Creates an ocean array with randomly placed ships
	// 0 = Empty ocean, -1 = damage, "string" = ship type
	var fleet = {
	//  'type': size,
		'Carrier': 5,
		'Battleship': 4,
		'Criuser': 3,
		'Sumarine' : 3,
		'Destroyer': 2
		}

	var positions, overlap;

	while (true) {
		// create array of 100 zeros
		positions = Array.apply(null, new Array(100)).map(Number.prototype.valueOf,0);
		overlap = false;

		for (ship in fleet) {

			var safeZone = 11 - fleet[ship];  // keeps ships inside ocean
			var hPos = Math.floor(Math.random()*safeZone);
			var vPos = Math.floor(Math.random()*safeZone);
			var posIndex = vPos*10 + hPos    // randomizes position of each ship
			var vertical = Math.random()>.5; // randomizes direction of each ship

			console.log('placing', ship, vertical?'vertically':'horizontally', 'starting at', posIndex);

			for (i=0; i < fleet[ship]; ++i){
				// Check if ships overlap
				if (positions[posIndex+i*(vertical?10:1)] != 0) {
					overlap = true;
					break;
				}
				positions[posIndex+i*(vertical?10:1)] = ship;
			}

		}

		if (!overlap) {
			break;
		} else {
			console.log('OVERLAPPING SHIPS, starting over!');
		}
	}

	return positions;
};