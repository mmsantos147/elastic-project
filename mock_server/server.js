const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/v1/stream", (req, res) => {
  // Configurando os cabeçalhos para SSE (Server-Sent Events)
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const keepAliveInterval = setInterval(() => {
    res.write(": keepalive\n\n");
  }, 15000);

  setTimeout(() => {
    const data = {
      requestId: "1746888836936",
      title: "Testes de Flexão e Fitness",
      paragraphs: [
        {
          content:
            "O teste de flexão de três pontos é um método utilizado para determinar os valores do módulo de elasticidade em flexão, estresse de flexão e a resposta de estresse-deformação do material. Este teste é realizado em uma máquina de testes universal e é importante para a análise de propriedades mecânicas de materiais como o concreto.",
          url: "https://en.wikipedia.org/wiki/Three-point_flexural_test",
        },
        {
          content:
            "O teste do ponto de virada é um método estatístico que avalia a independência de uma série de variáveis aleatórias. Descrito por Maurice Kendall e Alan Stuart, ele é considerado eficaz para testar a ciclicidade, mas inadequado para examinar tendências. Este teste foi publicado pela primeira vez por Irénée-Jules Bienaymé em 1874.",
          url: "https://en.wikipedia.org/wiki/Turning_point_test",
        },
        {
          content:
            "O teste de fitness multi-estágios, conhecido também como teste PACER ou beep test, é utilizado para estimar a capacidade aeróbica de um atleta. Os participantes devem correr 20 metros de um lado para o outro em um intervalo determinado por sinais sonoros, com a dificuldade aumentando a cada minuto, o que ajuda a medir a resistência cardiovascular.",
          url: "https://en.wikipedia.org/wiki/Multi-stage_fitness_test",
        },
      ],
    };
    res.write(`event: AiAbstract\ndata: ${JSON.stringify(data)}\n\n`);
  }, 5000);

  // Quando a conexão for fechada
  req.on("close", () => {
    clearInterval(keepAliveInterval);
    res.end();
  });
});

// Endpoint /v1/search/suggestions
app.post("/v1/search/suggestions", (req, res) => {
  const { query } = req.body;

  if (query && query.trim().length > 4) {
    const suggestions = [];
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
    return res.json(suggestions);
  } else {
    const suggestions = [];
    return res.status(200).json(suggestions);
  }
});

app.get("/v1/history", (req, res) => {
  const history = [];

  return res.status(200).json(history);
});

app.post("/v1/search", (req, res) => {
  const { search } = req.body;

  let response;

  if (search === "none")
    response = {
      hits: 0,
      pages: 0,
      timeTaken: 0.0,
      suggestions: [],
      results: [],
      requestId: "1746888836933",
    };
  else
    response = {
      hits: 693,
      pages: 70,
      timeTaken: 0.635,
      suggestions: [{ text: "right", offset: 0, length: 4, option: null }, { text: "wrng", offset: 0, length: 4, option: "wrong" }],
      results: [
        {
          id: "14232",
          score: 7.947667,
          url: "https://en.wikipedia.org/wiki/Three-point_flexural_test",
          title: "Three-point flexural test",
          content:
            "Three-point flexural <strong>test</strong> 1940s flexural <strong>test</strong> machinery working on a sample of concrete <strong>Test</strong> fixture on universal <strong>testing</strong> machine for three-point flex <strong>test</strong> The three-point bending flexural <strong>test</strong> provides values for the modulus of elasticity in bending <som1>E_f</som1>, flexural stress <som2>\\sigma_f</som2>, flexural strain <som3>\\epsilon_f</som3> and the flexural stress–strain response of the material. This <strong>test</strong> is performed on a universal <strong>testing</strong> machine (tensile <strong>testing</strong> machine or tensile <strong>teste</strong>",
          reading_time: 11,
          datetime: "2011-12-03",
        },
        {
          id: "32105",
          score: 7.8845177,
          url: "https://en.wikipedia.org/wiki/Turning_point_test",
          title: "Turning point test",
          content:
            'Turning point <strong>test</strong> In statistical hypothesis <strong>testing</strong>, a turning point <strong>test</strong> is a statistical <strong>test</strong> of the independence of a series of random variables.[1][2][3] Maurice Kendall and Alan Stuart describe the <strong>test</strong> as "reasonable for a <strong>test</strong> against cyclicity but poor as a <strong>test</strong> against trend."[4][5] The <strong>test</strong> was first published by Irénée-Jules Bienaymé in 1874.[4][6] Statement of <strong>test</strong> The turning point <strong>tests</strong> the null hypothesis[1] H0: X1, X2, ..., Xn are independent and identically distributed random v',
          reading_time: 6,
          datetime: "2014-11-22",
        },
        {
          id: "10108",
          score: 7.7892075,
          url: "https://en.wikipedia.org/wiki/Multi-stage_fitness_test",
          title: "Multi-stage fitness test",
          content:
            "Multi-stage fitness <strong>test</strong> The multi-stage fitness <strong>test</strong> (MSFT), also known as the beep <strong>test</strong>, bleep <strong>test</strong>, PACER (Progressive Aerobic Cardiovascular Endurance Run), PACER <strong>test</strong>, FitnessGram PACER <strong>test</strong>, or the 20 m Shuttle Run <strong>Test</strong> (20 m SRT), is a running <strong>test</strong> used to estimate an athlete's aerobic capacity (VO2 max). The <strong>test</strong> requires participants to run 20 meters back and forth across a marked track keeping time with beeps. Every minute or so, the next level commences: the time between beeps gets sh",
          reading_time: 3,
          datetime: "2021-07-15",
        },
        {
          id: "11566",
          score: 7.7481556,
          url: "https://en.wikipedia.org/wiki/Permutation_test",
          title: "Permutation test",
          content:
            "A permutation <strong>test</strong> (also called re-randomization <strong>test</strong>) is an exact statistical hypothesis <strong>test</strong> making use of the proof by contradiction in which the distribution of the <strong>test</strong> statistic under the null hypothesis is obtained by calculating all possible values of the <strong>test</strong> statistic under possible rearrangements of the observed data. Permutation <strong>tests</strong> are, therefore, a form of resampling. Permutation <strong>tests</strong> can be understood as surrogate data <strong>testing</strong> where the surrogate data under the null hypothesis",
          reading_time: 1,
          datetime: "2012-08-14",
        },
        {
          id: "5144",
          score: 7.710675,
          url: "https://en.wikipedia.org/wiki/Ratio_test",
          title: "Ratio test",
          content:
            "Ratio <strong>test</strong> In mathematics, the ratio <strong>test</strong> is a <strong>test</strong> (or \"criterion\") for the convergence of a series <som1>\\sum_{n=1}^\\infty a_n,</som1> where each term is a real or complex number and is nonzero when is large. The <strong>test</strong> was first published by Jean le Rond d'Alembert and is sometimes known as d'Alembert's ratio <strong>test</strong> or as the Cauchy ratio <strong>test</strong>.[1] The <strong>test</strong> Decision diagram for the ratio <strong>test</strong> The usual form of the <strong>test</strong> makes use of the limit The ratio <strong>test</strong> states that: if L < 1 then the series con",
          reading_time: 6,
          datetime: "2017-05-05",
        },
        {
          id: "9057",
          score: 7.674818,
          url: "https://en.wikipedia.org/wiki/One-_and_two-tailed_tests",
          title: "One- and two-tailed tests",
          content:
            "One- and two-tailed <strong>tests</strong> A two-tailed <strong>test</strong> applied to the normal distribution. A one-tailed <strong>test</strong>, showing the p-value as the size of one tail. In statistical significance <strong>testing</strong>, a one-tailed <strong>test</strong> and a two-tailed <strong>test</strong> are alternative ways of computing the statistical significance of a parameter inferred from a data set, in terms of a <strong>test</strong> statistic. A two-tailed <strong>test</strong> is appropriate if the estimated value is greater or less than a certain range of values, for example, whether a <strong>test</strong> taker may",
          reading_time: 5,
          datetime: "2017-12-06",
        },
        {
          id: "16121",
          score: 7.6363564,
          url: "https://en.wikipedia.org/wiki/Ljung–Box_test",
          title: "Ljung–Box test",
          content:
            'The Ljung–Box <strong>test</strong> (named for Greta M. Ljung and George E. P. Box) is a type of statistical <strong>test</strong> of whether any of a group of autocorrelations of a time series are different from zero. Instead of <strong>testing</strong> randomness at each distinct lag, it <strong>tests</strong> the "overall" randomness based on a number of lags, and is therefore a portmanteau <strong>test</strong>. This <strong>test</strong> is sometimes known as the Ljung–Box Q <strong>test</strong>, and it is closely connected to the Box–Pierce <strong>test</strong> (which is named after George E. P. Box and David A. Pierce).',
          reading_time: 1,
          datetime: "2012-01-25",
        },
        {
          id: "34657",
          score: 7.6224203,
          url: "https://en.wikipedia.org/wiki/Cucconi_test",
          title: "Cucconi test",
          content:
            "In statistics, the Cucconi <strong>test</strong> is a nonparametric <strong>test</strong> for jointly comparing central tendency and variability (detecting location and scale changes) in two samples. Many rank <strong>tests</strong> have been proposed for the two-sample location-scale problem. Nearly all of them are Lepage-type <strong>tests</strong>, that is a combination of a location <strong>test</strong> and a scale <strong>test</strong>. The Cucconi <strong>test</strong> was first proposed by Odoardo Cucconi in 1968.[1] The Cucconi <strong>test</strong> is not as familiar as other location-scale <strong>tests</strong> but it is of interest",
          reading_time: 2,
          datetime: "2019-01-25",
        },
        {
          id: "5918",
          score: 7.593691,
          url: "https://en.wikipedia.org/wiki/Student's_t-test",
          title: "Student's <i>t</i>-test",
          content:
            "The t-<strong>test</strong> is any statistical hypothesis <strong>test</strong> in which the <strong>test</strong> statistic follows a Student's t-distribution under the null hypothesis. A t-<strong>test</strong> is the most commonly applied when the <strong>test</strong> statistic would follow a normal distribution if the value of a scaling term in the <strong>test</strong> statistic were known. When the scaling term is unknown and is replaced by an estimate based on the data, the <strong>test</strong> statistics (under certain conditions) follow a Student's t distribution. The t-<strong>test</strong> can be used, for example,",
          reading_time: 1,
          datetime: "2017-05-28",
        },
        {
          id: "15224",
          score: 7.5822506,
          url: "https://en.wikipedia.org/wiki/Test_probe",
          title: "Test probe",
          content:
            "Typical passive oscilloscope probe being used to <strong>test</strong> an integrated circuit. A <strong>test</strong> probe is a physical device used to connect electronic <strong>test</strong> equipment to a device under <strong>test</strong> (DUT). <strong>Test</strong> probes range from very simple, robust devices to complex probes that are sophisticated, expensive, and fragile. Specific types include <strong>test</strong> prods, oscilloscope probes and current probes. A <strong>test</strong> probe is often supplied as a <strong>test</strong> lead, which includes the probe, cable and terminating connector. Voltage Voltage pro",
          reading_time: 6,
          datetime: "2020-10-06",
        },
      ],
      requestId: "1746888836936",
    };

  setTimeout(() => {
    console.log("Consulta recebida. Simulando tempo de processamento...");
    return res.status(200).json(response);
  }, 1300);
});

app.post("/v1/user/verify", (req, res) => {
  const response = {
    username: "username",
    logged: true,
  };

  return res.status(200).json(response);
});

app.get("/v1/weatherReport", (req, res) => {
  const response = {
    id: 804,
    group: "Clouds",
    city: "Alfenas",
    temperature: 22,
    description: "overcast clouds",
  };

  return res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
