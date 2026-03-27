
const doctors = [
    { 
        id: 1, 
        name: "Dr. Nino Balladares", 
        specialty: "General Physician", 
        img: "https://via.placeholder.com/150", 
        bio: "Dedicated to providing high-quality, comprehensive primary care. I believe that effective healthcare is built on trust and clear communication."
    },
    { 
        id: 2, 
        name: "Dr. Joey Magquilat", 
        specialty: "Pediatrician", 
        img: "https://via.placeholder.com/150", 
        bio: "Focused on nurturing the health of children from infancy through adolescence. Partnering with parents to ensure every child reaches their full potential." 
    },
    { 
        id: 3, 
        name: "Dr. Aika Navarro", 
        specialty: "OB-GYN", 
        img: "https://via.placeholder.com/150", 
        bio: "Passionate about women's health and empowerment. Providing comprehensive care from prenatal journeys to gynecologic wellness with a gentle, patient-first approach." 
    }
];


function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let errorMsg = document.getElementById("loginError");


    if (user === "staff_healthsync" && pass === "medical2024") {
 
        document.querySelector(".login-container").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    } else {
        errorMsg.innerText = "Access Denied: Invalid Hospital Credentials!";
    }
}


function showTab(tabId) {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.classList.remove("active"));

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.classList.add("active");
    }
}


function displayDoctorInfo(docId) {
    const doctor = doctors.find(d => d.id === docId);
    const infoDiv = document.getElementById("doctor-info");
    
    if (doctor) {
        infoDiv.innerHTML = `
            <img src="${doctor.img}" alt="${doctor.name}">
            <div>
                <h3>${doctor.name}</h3>
                <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                <p>${doctor.bio}</p>
                <button onclick="bookNow('${doctor.name}')" style="background:#3498db; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Select Doctor</button>
            </div>
        `;
    }
}


function bookAppointment(event) {
    event.preventDefault(); 
    
    const patientName = document.getElementById("pName").value;
    const date = document.getElementById("appDate").value;
    const service = document.getElementById("serviceSelect").value;

    if (patientName && date) {
        alert(`Success! Appointment set for ${patientName} on ${date} for ${service}. HealthSync will send an SMS confirmation.`);
       
        event.target.reset();
    } else {
        alert("Please fill in all fields.");
    }
}


let currentSlide = 0;
function startCarousel() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 4000); // Lilipat ang picture bawat 4 seconds
}


window.onload = startCarousel;


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}