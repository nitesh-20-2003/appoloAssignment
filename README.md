## TECH STACK

### Frontend
- Next.js (TypeScript)
- ShadCN UI
- Tailwind CSS

### Backend
- Next.js API Routes

### Database
- Prisma
- Supabase
-zod validation

## Project Structure
<pre> my-nextjs-app/
│
├── app/ (Next.js App Router)
│ │
│ ├── api/ (Backend Routes)
│ │ ├── addDoctors/
│ │ │ └── route.js
│ │ │
│ │ └── getDoctors/
│ │ └── route.js
│ │
│ ├── globals.css
│ ├── page.jsx # Destination page
│ └── layout.jsx # Shared layout (Header only)
│
├── components/ (UI Components)
│ │
│ ├── Header.jsx
│ ├── Filters.jsx
│ ├── DoctorCard.jsx
│ └── Pagination.jsx
│
├── lib/ (utils & database clients)
│ ├── db.js
│ └── prisma.js # or mongoose.js
│
├── public/
│ └── robots.txt
│
├── next.config.js
├── package.json
└── README.md

Copy
Edit
 </pre>
## Backend Logic

- **Request Validation**: Every incoming request is validated using [Zod](https://github.com/colinhacks/zod).  
  - **addDoctors**: payload schema enforces `name: string`, `specialty: string`, `fee: number`, etc.  
  - **getDoctors**: query parameters (filters, pagination) are parsed and validated with Zod before hitting the database.



- **Data Layer**:  
 
  -  with **Prisma**: Zod schemas generate the TypeScript types for your Prisma client calls, ensuring end-to-end type safety.
 

### end points

- `/api/addDoctors`
- `/api/getDoctors`

