const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint /v1/search/suggestions
app.post("/v1/search/suggestions", (req, res) => {
  const { query } = req.body;

 if (query && query.trim().length > 4) {
    const suggestions = [
      ];
      return res.json({ suggestions });
 }

  if (query && query.trim().length > 0) {
    const suggestions = [
      "<i>De dicto</i> and <i>de re</i>",
      "Gravity Probe A",
      "Ankeny–Artin–Chowla congruence",
      "List of commutative algebra topics",
      "Artinian module",
    ];
    return res.json({ suggestions });
  } else {
    const suggestions = [];
    return res.status(200).json({ suggestions });
  }
});

app.get("/v1/history", (req, res) => {
  const history = [
    { id: 1, content: "history_element_1" },
    { id: 2, content: "history_element_2" },
    { id: 3, content: "history_element_3" },
  ];

  return res.status(200).json(history)
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
