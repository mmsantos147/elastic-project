const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
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
  const history = [{"id":3,"content":""},{"id":2,"content":"teste"},{"id":1,"content":""}];

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
      suggestions: [
        { text: "right", offset: 0, length: 4, option: null },
        { text: "wrng", offset: 0, length: 4, option: "wrong" },
      ],
      results: [
        {
          id: "14232",
          score: 7.947667,
          url: "https://en.wikipedia.org/wiki/Three-point_flexural_test",
          title: "Three-point flexural test",
          content:
            "Three-point flexural **test** 1940s flexural **test** machinery working on a sample of concrete **Test** fixture on universal **testing** machine for three-point flex **test** The three-point bending flexural **test** provides values for the modulus of elasticity in bending <som1>E_f</som1>, flexural stress <som2>\\sigma_f</som2>, flexural strain <som3>\\epsilon_f</som3> and the flexural stress–strain response of the material. This **test** is performed on a universal **testing** machine (tensile **testing** machine or tensile **teste**",
          reading_time: 11,
          datetime: "2011-12-03",
        },
        {
          id: "32105",
          score: 7.8845177,
          url: "https://en.wikipedia.org/wiki/Turning_point_test",
          title: "Turning point test",
          content:
            'Turning point **test** In statistical hypothesis **testing**, a turning point **test** is a statistical **test** of the independence of a series of random variables.[1][2][3] Maurice Kendall and Alan Stuart describe the **test** as "reasonable for a **test** against cyclicity but poor as a **test** against trend."[4][5] The **test** was first published by Irénée-Jules Bienaymé in 1874.[4][6] Statement of **test** The turning point **tests** the null hypothesis[1] H0: X1, X2, ..., Xn are independent and identically distributed random v',
          reading_time: 6,
          datetime: "2014-11-22",
        },
        {
          id: "10108",
          score: 7.7892075,
          url: "https://en.wikipedia.org/wiki/Multi-stage_fitness_test",
          title: "Multi-stage fitness test",
          content:
            "Multi-stage fitness **test** The multi-stage fitness **test** (MSFT), also known as the beep **test**, bleep **test**, PACER (Progressive Aerobic Cardiovascular Endurance Run), PACER **test**, FitnessGram PACER **test**, or the 20 m Shuttle Run **Test** (20 m SRT), is a running **test** used to estimate an athlete's aerobic capacity (VO2 max). The **test** requires participants to run 20 meters back and forth across a marked track keeping time with beeps. Every minute or so, the next level commences: the time between beeps gets sh",
          reading_time: 3,
          datetime: "2021-07-15",
        },
        {
          id: "11566",
          score: 7.7481556,
          url: "https://en.wikipedia.org/wiki/Permutation_test",
          title: "Permutation test",
          content:
            "A permutation **test** (also called re-randomization **test**) is an exact statistical hypothesis **test** making use of the proof by contradiction in which the distribution of the **test** statistic under the null hypothesis is obtained by calculating all possible values of the **test** statistic under possible rearrangements of the observed data. Permutation **tests** are, therefore, a form of resampling. Permutation **tests** can be understood as surrogate data **testing** where the surrogate data under the null hypothesis",
          reading_time: 1,
          datetime: "2012-08-14",
        },
        {
          id: "5144",
          score: 7.710675,
          url: "https://en.wikipedia.org/wiki/Ratio_test",
          title: "Ratio test",
          content:
            "Ratio **test** In mathematics, the ratio **test** is a **test** (or \"criterion\") for the convergence of a series <som1>\\sum_{n=1}^\\infty a_n,</som1> where each term is a real or complex number and is nonzero when is large. The **test** was first published by Jean le Rond d'Alembert and is sometimes known as d'Alembert's ratio **test** or as the Cauchy ratio **test**.[1] The **test** Decision diagram for the ratio **test** The usual form of the **test** makes use of the limit The ratio **test** states that: if L < 1 then the series con",
          reading_time: 6,
          datetime: "2017-05-05",
        },
        {
          id: "9057",
          score: 7.674818,
          url: "https://en.wikipedia.org/wiki/One-_and_two-tailed_tests",
          title: "One- and two-tailed tests",
          content:
            "One- and two-tailed **tests** A two-tailed **test** applied to the normal distribution. A one-tailed **test**, showing the p-value as the size of one tail. In statistical significance **testing**, a one-tailed **test** and a two-tailed **test** are alternative ways of computing the statistical significance of a parameter inferred from a data set, in terms of a **test** statistic. A two-tailed **test** is appropriate if the estimated value is greater or less than a certain range of values, for example, whether a **test** taker may",
          reading_time: 5,
          datetime: "2017-12-06",
        },
        {
          id: "16121",
          score: 7.6363564,
          url: "https://en.wikipedia.org/wiki/Ljung–Box_test",
          title: "Ljung–Box test",
          content:
            'The Ljung–Box **test** (named for Greta M. Ljung and George E. P. Box) is a type of statistical **test** of whether any of a group of autocorrelations of a time series are different from zero. Instead of **testing** randomness at each distinct lag, it **tests** the "overall" randomness based on a number of lags, and is therefore a portmanteau **test**. This **test** is sometimes known as the Ljung–Box Q **test**, and it is closely connected to the Box–Pierce **test** (which is named after George E. P. Box and David A. Pierce).',
          reading_time: 1,
          datetime: "2012-01-25",
        },
        {
          id: "34657",
          score: 7.6224203,
          url: "https://en.wikipedia.org/wiki/Cucconi_test",
          title: "Cucconi test",
          content:
            "In statistics, the Cucconi **test** is a nonparametric **test** for jointly comparing central tendency and variability (detecting location and scale changes) in two samples. Many rank **tests** have been proposed for the two-sample location-scale problem. Nearly all of them are Lepage-type **tests**, that is a combination of a location **test** and a scale **test**. The Cucconi **test** was first proposed by Odoardo Cucconi in 1968.[1] The Cucconi **test** is not as familiar as other location-scale **tests** but it is of interest",
          reading_time: 2,
          datetime: "2019-01-25",
        },
        {
          id: "5918",
          score: 7.593691,
          url: "https://en.wikipedia.org/wiki/Student's_t-test",
          title: "Student's <i>t</i>-test",
          content:
            "The t-**test** is any statistical hypothesis **test** in which the **test** statistic follows a Student's t-distribution under the null hypothesis. A t-**test** is the most commonly applied when the **test** statistic would follow a normal distribution if the value of a scaling term in the **test** statistic were known. When the scaling term is unknown and is replaced by an estimate based on the data, the **test** statistics (under certain conditions) follow a Student's t distribution. The t-**test** can be used, for example,",
          reading_time: 1,
          datetime: "2017-05-28",
        },
        {
          id: "15224",
          score: 7.5822506,
          url: "https://en.wikipedia.org/wiki/Test_probe",
          title: "Test probe",
          content:
            "Typical passive oscilloscope probe being used to **test** an integrated circuit. A **test** probe is a physical device used to connect electronic **test** equipment to a device under **test** (DUT). **Test** probes range from very simple, robust devices to complex probes that are sophisticated, expensive, and fragile. Specific types include **test** prods, oscilloscope probes and current probes. A **test** probe is often supplied as a **test** lead, which includes the probe, cable and terminating connector. Voltage Voltage pro",
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
    logged: true,
    username: "username",
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


app.get("/v1/graph/14232/2", (req, res) => {
  const filePath = path.join(__dirname, 'graph_2_level.json')

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    try {
      const jsonData = JSON.parse(data);
      setTimeout(() => {
        res.json(jsonData);

      }, 3500)
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      setTimeout(() => {
        res.status(500).json({ error: 'Erro ao processar o JSON' });
      }, 3500)
    }
  })
});

app.get("/v1/favorite", (req, res) => {
  const favoriteItems = [
    {
      id: 1,
      title: "Inteligência Artificial: O que é e como funciona",
      url: "https://wikipedia.org/wiki/Inteligencia_artificial",
      source: "Wikipedia",
      content:
        "Inteligência artificial (IA) é a inteligência demonstrada por máquinas ao executar tarefas complexas associadas a seres inteligentes. Também é um campo de estudo acadêmico que desenvolve e pesquisa algoritmos e sistemas de computador capazes de realizar tarefas que normalmente requerem inteligência humana.",
      date: "2023-10-15",
      readTime: 8,
    },
    {
      id: 2,
      title: "Machine Learning: Fundamentos e Aplicações",
      url: "https://wikipedia.org/wiki/Machine_Learning",
      source: "Wikipedia",
      content:
        "Machine Learning é um subcampo da inteligência artificial que fornece aos sistemas a capacidade de aprender automaticamente e melhorar com a experiência, sem serem explicitamente programados. O aprendizado se concentra no desenvolvimento de programas que podem acessar dados e usá-los para aprender por si próprios.",
      date: "2023-11-22",
      readTime: 12,
    },
    {
      id: 3,
      title: "Blockchain: Revolucionando as Finanças Digitais",
      url: "https://wikipedia.org/wiki/Blockchain",
      source: "Wikipedia",
      content:
        "A tecnologia blockchain tem o potencial de transformar fundamentalmente a maneira como os mercados financeiros operam. Por ser um livro-razão distribuído e imutável, oferece maior transparência, segurança e eficiência para transações financeiras.",
      date: "2024-01-10",
      readTime: 15,
    },
    {
      id: 4,
      title: "Realidade Virtual na Educação Moderna",
      url: "https://wikipedia.org/wiki/Realidade_Virtual",
      source: "Wikipedia",
      content:
        "A realidade virtual (RV) está transformando as salas de aula tradicionais em ambientes de aprendizagem imersivos. Estudos recentes demonstram que o uso de RV na educação pode aumentar a retenção de informações e melhorar significativamente o engajamento dos alunos.",
      date: "2023-12-05",
      readTime: 10,
    },
    {
      id: 5,
      title: "Ciência de Dados: O Futuro da Análise de Informações",
      url: "https://wikipedia.org/wiki/Ciencia_de_Dados",
      source: "Wikipedia",
      content:
        "Ciência de dados é um campo interdisciplinar que utiliza métodos, processos, algoritmos e sistemas científicos para extrair conhecimento e insights de dados estruturados e não estruturados. Combina estatística, análise de dados, aprendizado de máquina e métodos relacionados.",
      date: "2023-09-20",
      readTime: 9,
    },
  ];

  return res.status(200).json(favoriteItems)
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
