// @ts-ignore
import { QueryClient, QueryObserver } from "https://esm.sh/@tanstack/query-core";

declare const Chart: any;

interface Diagnosis {
  month: string;
  year: number;
  blood_pressure: {
    systolic: { value: number; levels: string };
    diastolic: { value: number; levels: string };
  };
  respiratory_rate: { value: number; levels: string };
  temperature: { value: number; levels: string };
  heart_rate: { value: number; levels: string };
}

interface DiagnosticList {
  name: string;
  description: string;
  status: string;
}

interface Patient {
  name: string;
  profile_picture: string;
  gender: string;
  age: number;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: Diagnosis[];
  diagnostic_list: DiagnosticList[];
  lab_results: string[];
}

const queryClient = new QueryClient();
const patientListElement = document.querySelector(".patient-list") as HTMLElement;
const diagnosisHistoryElement = document.querySelector(".diagnosis-history") as HTMLElement;
const diagnosisListElement = document.querySelector(".diagnosis-list") as HTMLElement;
const patientInfoElement = document.querySelector(".patient-info-content") as HTMLElement;
const labInfoContentElement = document.querySelector(".lab-info-content div") as HTMLElement;

async function fetchPatients() {
  const auth = window.btoa("coalition:skills-test");
  const res = await fetch(
    "https://fedskillstest.coalitiontechnologies.workers.dev",
    {
      headers: { Authorization: `Basic ${auth}` },
    },
  );
  return res.json();
}

const patientsQuery = {
  queryKey: ["patients"],
  queryFn: fetchPatients,
};

const observer = new QueryObserver(queryClient, patientsQuery);

observer.subscribe((result: any) => {
  if (result.isLoading) {
    patientListElement.innerHTML = `<p>Loading...</p>`;
  }

  if (result.isSuccess) {
    const patients: Patient[] = result.data;
    patientListElement.innerHTML = "";
    diagnosisHistoryElement.innerHTML = "";
    diagnosisListElement.innerHTML = "";
    patientInfoElement.innerHTML = "";
    labInfoContentElement.innerHTML = "";

    patients.forEach((p: Patient) => {
      const div = document.createElement("div");
      div.classList.add("patient-item");
      if (p.name === "Jessica Taylor") div.classList.add("active");
      div.innerHTML = `
        <img src="${p.profile_picture}" alt="Patient Profile" width="48" height="48"/>
        <div>
          <p class="user-name">${p.name}</p>
          <p class="user-role">${p.gender}, ${p.age}</p>
        </div>
        <img src="./public/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="More Options" width="18" height="4"/>
      `;
      patientListElement.appendChild(div);
    });

    const jessica = patients.find((p: Patient) => p.name === "Jessica Taylor");

    if (jessica && jessica.diagnosis_history?.length > 0) {
      const latestDiagnosis = jessica.diagnosis_history[0];

      const cards = [
        {
          title: "Blood Pressure",
          rightTitle: "Last 6 Months",
        },
        {
          title: "Respiratory Rate",
          value: latestDiagnosis.respiratory_rate?.value
            ? `${latestDiagnosis.respiratory_rate.value} bpm`
            : "",
          level: latestDiagnosis.respiratory_rate?.levels || "",
          icon: "./public/respiratory rate.svg",
        },
        {
          title: "Temperature",
          value: latestDiagnosis.temperature?.value
            ? `${latestDiagnosis.temperature.value} °F`
            : "",
          level: latestDiagnosis.temperature?.levels || "",
          icon: "./public/temperature.svg",
        },
        {
          title: "Heart Rate",
          value: latestDiagnosis.heart_rate?.value
            ? `${latestDiagnosis.heart_rate.value} bpm`
            : "",
          level: latestDiagnosis.heart_rate?.levels || "",
          icon: "./public/HeartBPM.svg",
        },
      ];

      cards.forEach((card) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          ${card.icon ? `<img src="${card.icon}" alt="${card.title}" width="96" height="96"/>` : ""}
          <div>
            <div style="margin-bottom:8px;font-weight:bold;display:flex; gap: 180px;align-items:center;">
              <p>${card.title}</p>
              <p>${card.rightTitle || ""}</p>
            </div>
            ${card.title === "Blood Pressure"
            ? `
              <div style="display:flex;align-items:flex-start;justify-content:space-between;width:100%;gap:20px;">
                <div class="chart-container" style="width:417px;flex:1.6;height:220px;">
                  <canvas id="bloodPressureChart"></canvas>
                </div>
                <div class="bp-details" style="flex:0.8;display:flex;flex-direction:column;gap:16px;align-self:flex-start;">
                  <div style="display:flex;flex-direction:column;gap:24px;">
                    <div>
                      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                        <div style="width:12px;height:12px;border-radius:50%;background:#FF6384;"></div>
                        <span>Systolic</span>
                      </div>
                      <div style="font-size:2rem;font-weight:bold;margin-bottom:4px;">
                        ${latestDiagnosis.blood_pressure?.systolic?.value || "120"}
                      </div>
                      <div style="display:flex;align-items:center;gap:4px;color:#2E3A59;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l6-6H6l6 6z"/></svg>
                        <span>${latestDiagnosis.blood_pressure?.systolic?.levels || "Higher than Average"}</span>
                      </div>
                    </div>
                    <div>
                      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                        <div style="width:12px;height:12px;border-radius:50%;background:#36A2EB;"></div>
                        <span>Diastolic</span>
                      </div>
                      <div style="font-size:2rem;font-weight:bold;margin-bottom:4px;">
                        ${latestDiagnosis.blood_pressure?.diastolic?.value || "80"}
                      </div>
                      <div style="display:flex;align-items:center;gap:4px;color:#2E3A59;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8l-6 6h12l-6-6z"/></svg>
                        <span>${latestDiagnosis.blood_pressure?.diastolic?.levels || "Lower than Average"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
            : ""
          }
            <strong>${card.value || ""}</strong>
            ${card.level ? `<span style="display:flex;gap:4px;align-items:center;">${card.level.includes("Lower") ? '<i class="iconsax" icon-name="chevron-down"></i>' : ""}<p>${card.level}</p></span>` : ""}
          </div>
        `;
        diagnosisHistoryElement.appendChild(div);
      });

      const bpHistory = jessica.diagnosis_history
        .filter(
          (d) =>
            d.blood_pressure?.systolic?.value &&
            d.blood_pressure?.diastolic?.value,
        )
        .map((d) => ({
          date: `${d.month} ${d.year}`,
          systolic: d.blood_pressure.systolic.value,
          diastolic: d.blood_pressure.diastolic.value,
        }));

      const labels = bpHistory.map((d) => d.date);
      const systolicData = bpHistory.map((d) => d.systolic);
      const diastolicData = bpHistory.map((d) => d.diastolic);

      const canvas = document.getElementById("bloodPressureChart") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Systolic",
              data: systolicData,
              borderColor: "#C26EB4",
              backgroundColor: "#C26EB4",
              borderWidth: 2,
              pointRadius: 1.5,
              pointHoverRadius: 5,
              tension: 0.4,
              fill: false,
            },
            {
              label: "Diastolic",
              data: diastolicData,
              borderColor: "#7E6CAB",
              backgroundColor: "#7E6CAB",
              borderWidth: 2,
              pointRadius: 1.5,
              pointHoverRadius: 5,
              tension: 0.4,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 60, max: 180, grid: { color: "rgba(0,0,0,0.05)" } },
            x: {
              grid: { display: false },
              ticks: { maxRotation: 0, minRotation: 0 },
            },
          },
        },
      });
    }

    if (jessica && jessica.diagnostic_list?.length > 0) {
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Problems/Diagnosis</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tbody = table.querySelector("tbody") as HTMLTableSectionElement;
      jessica.diagnostic_list.forEach((diagnosis) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${diagnosis.name}</td>
          <td>${diagnosis.description}</td>
          <td>${diagnosis.status}</td>
        `;
        tbody.appendChild(row);
      });
      diagnosisListElement.appendChild(table);
    }

    if (jessica) {
      patientInfoElement.innerHTML = `
        <div class="patient-card">
          <div class="patient-header">
            <img src="${jessica.profile_picture}" alt="${jessica.name}" class="patient-avatar"/>
            <h3 style="font-weight: bold; font-size: 24px;">${jessica.name}</h3>
          </div>

          <div class="contact-info">
            <p><i class="iconsax" icon-name="calendar-1"></i> <span><strong>Date of Birth</strong> ${jessica.date_of_birth}</span></p>
            <p><i class="iconsax" icon-name="female"></i> <span><strong>Gender</strong> ${jessica.gender}</span></p>
            <p><i class="iconsax" icon-name="phone"></i> <span><strong>Contact Info</strong> ${jessica.phone_number}</span></p>
            <p><i class="iconsax" icon-name="phone"></i> <span><strong>Emergency Contact</strong> ${jessica.emergency_contact}</span></p>
            <p><i class="iconsax" icon-name="shield-tick"></i> <span><strong>Insurance Provider</strong> ${jessica.insurance_type}</span></p>
          </div>

          <button class="view-more-btn">Show All Information</button>
        </div>
      `;

      if (jessica.lab_results?.length > 0) {
        labInfoContentElement.innerHTML = jessica.lab_results
          .map(
            (result) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #eee;">
            <div>
              <p">${result}</p>
              </div>
            <i class="iconsax" icon-name="download-2" style="font-size:20px;cursor:pointer;"></i>
          </div>
        `,
          )
          .join("");
      }
    }
  }
});

queryClient.mount();
observer.refetch();
