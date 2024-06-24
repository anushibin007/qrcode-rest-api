const express = require("express");
const { onRequest } = require("firebase-functions/v2/https");

const app = express();
var QRCode = require("qrcode");

/**
 * Function to convert text to base64 encoded data URL that represents a QR Code
 */
app.get("/toDataURL", (request, response) => {
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

app.get("/toImage", (request, response) => {
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

exports.api = onRequest(app);
