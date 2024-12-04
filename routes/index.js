var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log("Asd");

    res.send("hehasdasde", { title: "Express" });
});
router.get("/:id", function (req, res, next) {
    console.log(req.params.id);
    const filePath = `./public/${req.params.id}/krakend.json`;
    try {
        // Membaca file JSON
        const fileContent = fs.readFileSync(filePath, "utf8");
        const jsonConfig = JSON.parse(fileContent);

        // Mengecek apakah terdapat endpoints
        if (!jsonConfig.endpoints || !Array.isArray(jsonConfig.endpoints)) {
            throw new Error("No endpoints found in the JSON configuration.");
        }

        // Menyusun data endpoint dan method
        const endpoints = jsonConfig.endpoints.map((endpoint) => ({
            endpoint: endpoint.endpoint,
            method: endpoint.method,
        }));

        res.json(endpoints);
    } catch (error) {
        console.error("Error reading or processing the file:", error.message);
        return [];
    }
});

module.exports = router;
