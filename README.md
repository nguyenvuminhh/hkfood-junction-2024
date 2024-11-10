# FLOW (Food Loss Optimization Workflow)

## Problem, Real-world Impact and Solution

- In HKFoods’ production environment, efficient communication and quality control are challenging due to segmented workspaces, language diversity among staff, and strict hygiene restrictions that limit physical movement between areas. This leads to quality inconsistencies, such as underweight or overweight products, that impact both profitability and sustainability. Ensuring accurate weights and high standards in every product is crucial to HKFoods’s commitment to quality and waste reduction. 

- By improving communication, monitoring, and quality control in every phase, HKFoods can ensure product accuracy, thus reducing waste, supporting sustainable production, and minimizing environmental footprint.

- We developed a web application to improve communication between departments at HK Food, helping to reduce the risk of food being over- or under-weighted during production. Additionally, we created a communication channel to enable efficient interactions among team members from different departments.

## Technology Used

- The frontend is developed using ReactJS for building interactive user interfaces, TailwindCSS for responsive and modern styling, Redux for state management, and MUI-X for enhanced UI components.
  
- On the backend, NodeJS and ExpressJS are utilized to create a REST API  server, with MongoDB as the database solution for efficient data storage and retrieval.
  
- Additionally, Socket.io and Socket.io Client are implemented to enable real-time communication between the frontend and backend.

## Challenges

- This was the first time for most of our team to use Socket.io to handle real-time communication. Initially, the process was quite confusing; however, everything came together well in the end.

## Possible Improvements

- Future development will shift to use AI algorithms to further reduce deviations in product weight to nearly zero, improving quality and efficiency. We also explore integrating the tool with IoT devices to enhance data granularity at every stage.

## Running the project locally

- git clone https://github.com/nguyenductung2709-dt/HKFood-Junction-2024.git

- Run the backend locally: cd backend => npm install => npm run dev

- Run the frontend locally: cd foodhk-junction-2024 => npm install => npm run dev
