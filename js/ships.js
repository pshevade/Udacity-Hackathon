
function getMyOcean() {
	// Creates an ocean array with randomly placed ships
	// 'water' = Empty ocean, "type [bow, stern] [h, v]" = ship type
	var fleet = {
	//  'type': size,
		'carrier': 5,
		'battleship': 4,
		'criuser': 3,
		'sumarine' : 3,
		'destroyer': 2
		}

	var positions, overlap;

	while (true) {
		// create array of 100 zeros
		positions = Array.apply(null, new Array(100)).map(String.prototype.valueOf, 'water');
		overlap = false;

		for (ship in fleet) {

			var safeZone = 11 - fleet[ship];  // keeps ships inside ocean
			var hPos = Math.floor(Math.random()*safeZone);
			var vPos = Math.floor(Math.random()*safeZone);
			var posIndex = vPos*10 + hPos    // randomizes position of each ship
			var vertical = Math.random()>.5; // randomizes direction of each ship
			var attributes;

			console.log('placing', ship, vertical ? 'vertically' : 'horizontally', 'starting at', posIndex);

			for (i=0; i < fleet[ship]; ++i){
				// Check if ships overlap
				if (positions[posIndex+i*(vertical?10:1)] != 'water') {
					overlap = true;
					break;
				}
				// add attributes for front, back and orientation
				attributes = '';
				if (i==0) {
					attributes += ' bow';
				} else if (i==fleet[ship]-1) {
					attributes += ' stern';
				}
				attributes += vertical ? ' v' : ' h';
				positions[posIndex+i*(vertical?10:1)] = ship + attributes;
			}
		}

		if (!overlap) {
			// all done
			console.log(positions);
			return positions;
		}
		
		console.log('OVERLAPPING SHIPS, starting over!');
	}
};