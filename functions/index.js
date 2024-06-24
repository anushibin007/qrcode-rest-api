const { onRequest } = require("firebase-functions/v2/https");
var QRCode = require("qrcode");

/**
 * Function to convert text to base64 encoded data URL that represents a QR Code
 */
exports.toDataURL = onRequest((request, response) => {
	const inputAsText = request.query.inputAsText;

	if (!inputAsText) {
		return response.status(400).send({
			dataUrl: null,
			error: "Please send input text as a query argument to `inputAsText`",
		});
	}

	QRCode.toDataURL(inputAsText, function (err, url) {
		return response.status(200).send({
			dataUrl: url,
			error: err,
		});
	});
});

exports.toImage = onRequest((request, response) => {
	const inputAsText = request.query.inputAsText;

	if (!inputAsText) {
		return response.status(400).send({
			dataUrl: null,
			error: "Please send input text as a query argument to `inputAsText`",
		});
	}

	response.setHeader("Content-Type", "image/png");

	QRCode.toFileStream(response, inputAsText, { type: "png" }, function (error) {
		if (error) {
			res.status(500).send({ error: "Error generating QR code. Error" + error });
		}
	});
});
