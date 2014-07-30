function hasher(crypto) {
	
	function createSalt() {
		var len = 8;
		return crypto.randomBytes(Math.ceil(len/2))
			.toString('hex')
			.substring(0, len);

	};

	 /*Compute the hash for the source with a salt in order to produce 
	 a random hash that represents that source.*/
	function computeHash(source, salt) {
		var hmac = crypto.createHmac("sha1", salt);
		var hash = hmac.update(source);
		return hash.digest('hex');
	}

	return {
		createSalt: createSalt,
		computeHash: computeHash
	};
}

module.exports = hasher;