# KYC Verification Dashboard

A modern, frontend-heavy KYC (Know Your Customer) and KYB (Know Your Business) verification platform built with Next.js, TypeScript, and Tailwind CSS. This application allows users to submit verification documents and admins to review and approve/reject submissions.

Check it out here: https://verification-dashboard-l7w3.vercel.app/

## Features

### For Applicants
- **Multi-step verification form** with personal and company information
- **Advanced liveness detection** with facial recognition and movement verification
- **Document upload** with file preview support
- **Real-time form validation** with step-by-step field requirements
- **Form validation** using Zod schema validation
- **Real-time status tracking** with visual indicators
- **Responsive design** that works on all devices

### For Admins
- **Admin dashboard** to review all submissions
- **Liveness check review** with detailed verification steps
- **Search and filter** functionality
- **Approval/rejection workflow** with notes
- **Statistics overview** with submission counts
- **Detailed submission review** modal

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Liveness Detection**: MediaPipe Face Mesh
- **Camera Integration**: React Webcam
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with camera access (for liveness detection)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd verification-dash
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
verification-dash/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard
│   │   ├── api/             # API routes
│   │   ├── status/          # Status tracking pages
│   │   ├── verify/          # Verification form
│   │   │   ├── LivenessCheck.tsx  # Liveness detection component
│   │   │   └── page.tsx     # Multi-step verification form
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/          # Reusable components
├── public/                  # Static assets
├── package.json
└── README.md
```

## User Journey

### Applicant Flow
1. **Visit Homepage** (`/`) - See platform overview and start verification
2. **Start Verification** (`/verify`) - Multi-step form with:
   - Step 1: Personal details (name, email, phone, DOB) - **Required field validation**
   - Step 2: **Liveness detection** - Facial recognition with look straight, left, and right checks
   - Step 3: Company information (name, type, registration, address) - **Required field validation**
   - Step 4: Document upload (ID, passport, license, etc.) - **Required field validation**
   - Step 5: Review and submit
3. **Status Tracking** (`/status/[id]`) - View verification status and timeline

### Admin Flow
1. **Admin Dashboard** (`/admin`) - Overview of all submissions
2. **Review Submissions** - Click "Review" to open detailed modal
3. **Liveness Check Review** - View detailed liveness verification results
4. **Approve/Reject** - Make decisions with optional notes
5. **Track Statistics** - View pending, approved, and rejected counts

## Key Features

### Liveness Detection
- **Real-time facial recognition** using MediaPipe Face Mesh
- **Three-step verification process**:
  - Look straight ahead
  - Turn head left
  - Turn head right
- **Automatic capture** of verification images
- **Success/failure indicators** for each step
- **Admin review** of liveness check results

### Form Validation
- **Step-by-step validation** - Next button disabled until all required fields are filled
- Comprehensive Zod schemas for all form fields
- Real-time validation with error messages
- File upload validation and preview

### Status Management
- Three status states: Pending, Approved, Rejected
- Visual status indicators with icons
- Timeline tracking for submission and review dates

### Admin Workflow
- **Liveness check review** with detailed step-by-step results
- Modal-based review system
- Optional reviewer notes for rejections
- Bulk status management
- Search and filter capabilities

## Liveness Detection Details

The liveness detection system uses advanced computer vision to verify that a real person is completing the verification:

### Technical Implementation
- **MediaPipe Face Mesh**: Real-time facial landmark detection
- **Head pose estimation**: Calculates head rotation angles
- **Automatic capture**: Triggers when correct head position is detected
- **Three verification steps**: Ensures comprehensive liveness verification

### Verification Steps
1. **Look Straight**: Head tilt angle between 87-93 degrees
2. **Turn Left**: Head tilt angle between 100-115 degrees  
3. **Turn Right**: Head tilt angle between 65-80 degrees

### Admin Review Features
- **Overall status**: Passed/Failed indicator
- **Completion timestamp**: When liveness check was completed
- **Step-by-step results**: Individual pass/fail for each verification step
- **Visual indicators**: Green checkmarks for passed steps, red X for failed

## Deployment

This project is designed to be deployed on Vercel with minimal configuration:

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Import the repository in Vercel
   - Deploy automatically

2. **Environment Variables** (if needed):
   ```env
   # Add any environment variables here
   ```

3. **Database Integration** (for production):
   - Replace localStorage with a proper database
   - Add authentication for admin access
   - Implement file storage (AWS S3, etc.)
   - Store liveness check images securely

## Customization

### Adding New Document Types
1. Update the `documentType` enum in the verification form
2. Add corresponding validation rules
3. Update admin dashboard display

### Modifying Form Fields
1. Edit Zod schemas in `/verify/page.tsx`
2. Update form components and validation
3. Modify admin review modal accordingly

### Liveness Detection Customization
1. Adjust head pose angle thresholds in `LivenessCheck.tsx`
2. Modify verification steps or add new ones
3. Update admin review display for new steps

### Styling Changes
- All styling is done with Tailwind CSS
- Custom colors and components can be added to `globals.css`
- Responsive design is built-in

## Security Considerations

For production use, consider implementing:

- **Authentication & Authorization**: Protect admin routes
- **Data Encryption**: Encrypt sensitive information including liveness data
- **File Validation**: Server-side file type and size validation
- **Liveness Data Security**: Secure storage of facial verification data
- **Rate Limiting**: Prevent spam submissions
- **Audit Logging**: Track all admin actions
- **GDPR Compliance**: Data retention and deletion policies
- **Camera Permissions**: Proper handling of camera access

## Browser Compatibility

The liveness detection feature requires:
- **Modern browser** with WebRTC support
- **Camera access** permissions
- **HTTPS connection** (required for camera access in production)
- **JavaScript enabled**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.
