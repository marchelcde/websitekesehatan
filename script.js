// Toggle Class Active
const navbarNav = document.querySelector(".navbar-nav");

// Ketika Hamburger Menu diklik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar Side Bar untuk menutup Menu
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Function to detect disease based on user input
function detectDisease() {
  // Get user input from the HTML element with the ID "symptoms"
  const symptomsInput = document.getElementById("symptoms");

  // Add an event listener for the "keydown" event on the input field
  symptomsInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Prevent default form submission behavior
      event.preventDefault();

      // Call the detectDiseaseLogic function with the current input value
      const disease = detectDiseaseLogic(symptomsInput.value);

      // Get the HTML element with the ID "result"
      const resultDiv = document.getElementById("result");

      // Initialize the diseaseInfo object
      let diseaseInfo;

      // Use a switch statement to determine the diseaseInfo object based on the disease variable
      switch (disease) {
        case "flu":
          diseaseInfo = {
            name: "Flu",
            causes:
              "Penyebab umum flu adalah infeksi virus influenza. Virus ini dapat menyebar melalui udara atau kontak dengan benda yang terkontaminasi.",
            medication:
              "Obat untuk flu meliputi istirahat yang cukup, minum banyak cairan, dan dapat juga diperlukan antipiretik atau obat pengurang demam.",
            source: "https://www.halodoc.com/kesehatan/flu",
          };
          break;
        case "sariawan":
          diseaseInfo = {
            name: "Sariawan",
            causes:
              "Penyebab utama dari sariawan yaitu adanya jamur Candida albicans, yang memang berada di dalam mulut dalam jumlah yang kecil dan pertumbuhan yang tidak terkendali.Namun, sariawan juga bisa disebabkan oleh berbagai macam faktor lainnya, seperti cedera, infeksi, atau alergi.",
            medication:
              "Hindari minuman atau makanan panas, serta makanan yang asin, pedas, dan asam untuk sementara.Sambil diiringi dengan meminum Obat antiseptik",
            source: "https://www.halodoc.com/kesehatan/sariawan",
          };
          break;

        // Add cases for other diseases if needed
        default:
          diseaseInfo = {
            name: "Penyakit tidak dikenal",
            causes: "Penyebab penyakit ini belum diketahui.",
            medication:
              "Konsultasikan dengan dokter untuk diagnosis dan pengobatan yang tepat.",
            source: "",
          };
      }

      // Set the innerHTML of the resultDiv element to display the diseaseInfo object
      resultDiv.innerHTML = `
        <p><strong>Penyakit yang didiagnosis:</strong> ${diseaseInfo.name}</p>
        <p><strong>Penyebab umum:</strong> ${diseaseInfo.causes}</p>
        <p><strong>Penanganan/Pengobatan:</strong> ${diseaseInfo.medication}</p>
        <p><strong>Sumber:</strong> <a href="${diseaseInfo.source}" target="_blank">${diseaseInfo.source}</a></p>`;
    }
  });
}

// Function for the disease detection logic
function detectDiseaseLogic(symptoms) {
  // Normalize the input: Convert all letters to lowercase and remove spaces
  symptoms = symptoms.toLowerCase().replace(/\s+/g, "");

  // Split the input into individual words
  const inputWords = symptoms.split(/\s+/);

  // List of diseases with their symptoms and information
  const diseases = {
    flu: {
      symptoms: ["demam", "batuk", "pilek", "sakitkepala", "lemas"],
      info: {
        name: "Flu",
      },
    },
    sariawan: {
      symptoms: ["susahmenelan", "rasatidaknyamandalammulut", "bibirpecah"],
      info: {
        name: "Sariawan",
      },
    },
    // Add other diseases with their symptoms here
  };

  // Iterate through the list of diseases
  for (let disease in diseases) {
    const symptomsList = diseases[disease].symptoms;

    // Check if at least one symptom of the disease matches a word in the user input
    if (inputWords.some((word) => symptomsList.includes(word))) {
      return disease; // Return the name of the matching disease
    }
  }

  // If no disease matches, return "Penyakit tidak dikenal"
  return "Penyakit tidak dikenal";
}
