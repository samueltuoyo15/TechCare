# Tech Care: Patient Health Management Dashboard

## Overview
Tech Care is a modern web-based dashboard application designed for healthcare professionals to efficiently manage patient information. Built with TypeScript, HTML, and CSS, this interactive interface provides a clear overview of patient lists, detailed diagnosis histories, vital signs visualizations powered by Chart.js, and comprehensive lab results, all fetched dynamically from a secure external API using Tanstack Query for robust data management.

## Features
-   **Dynamic Patient List**: Displays a scrollable list of patients with their profile pictures, names, genders, and ages, highlighting the currently selected patient.
-   **Detailed Patient Information**: Presents a comprehensive view of the selected patient's profile, including date of birth, gender, contact information, emergency contact, and insurance details.
-   **Diagnosis History Visualization**: Renders key vital signs (blood pressure, respiratory rate, temperature, heart rate) in an intuitive card format. Blood pressure history is visualized using an interactive line chart powered by Chart.js.
-   **Diagnostic List Table**: Organizes a patient's diagnostic records in a clear, structured table format showing problems/diagnosis, descriptions, and statuses.
-   **Lab Results Viewer**: Displays a list of lab results with a convenient download icon for each entry, simulating document retrieval.
-   **Modern User Interface**: A clean, intuitive design built with standard HTML and CSS, ensuring a smooth user experience.
-   **Efficient Data Fetching**: Utilizes Tanstack Query for efficient, cached, and automatically refetching data from the backend API, ensuring the UI remains responsive and up-to-date.

## Usage
To run this application locally, simply open the `index.html` file in your web browser. The application will automatically fetch and display patient data.

### Navigating the Dashboard
1.  **Patient List (Left Sidebar)**: On the left, you'll find a list of all registered patients. "Jessica Taylor" is pre-selected by default to showcase her comprehensive data. You may observe a brief data loading indicator when the application initially fetches data.
2.  **Main Content Area**: This central area displays the selected patient's diagnosis history and a detailed diagnostic list.
    *   **Diagnosis History**: Features interactive cards for key vital signs. The "Blood Pressure" card includes a dynamic chart visualizing systolic and diastolic readings over the last six months.
    *   **Diagnosis List**: A table presents a structured overview of the patient's diagnosed conditions, their descriptions, and current status.
3.  **Patient Information (Right Sidebar)**: The right sidebar provides a detailed summary of the selected patient, including personal contact details, emergency contacts, insurance information, and a list of lab results with download icons.

No server-side setup is required to get started; all data fetching is handled client-side against the provided external API.

## Technologies Used

| Technology         | Description                                                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------------ |
| **TypeScript**     | A superset of JavaScript that adds static types, enhancing code quality and developer productivity.     |
| **HTML5**          | The backbone of the web, used for structuring the content and layout of the dashboard.                   |
| **CSS3**           | Stylesheets define the visual presentation of the application, ensuring a modern and intuitive UI.        |
| **Tanstack Query** | A powerful data-fetching library for managing, caching, and synchronizing asynchronous data in web applications. |
| **Chart.js**       | A flexible open-source JavaScript charting library that helps visualize data on the web.                |
| **Iconsax**        | A collection of vector icons used throughout the UI to enhance visual clarity and user experience.      |

## License
This project does not currently specify an explicit license.

## Author
**[Your Name]**
*   LinkedIn: [samuel-tuoyo](https://www.linkedin.com/in/samuel-tuoyo-8568b62b6/)
*   X (formerly Twitter): [Tuoyos26091](https://x.com/TuoyoS26091)

---

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)