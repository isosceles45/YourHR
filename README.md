# YourHR

YourHR is a full-stack job search service designed to help job seekers find ideal job roles based on their qualifications and preferences. This project includes both frontend and backend components, offering a complete solution for job seekers to sign up and submit their resumes.

![home page](https://media.discordapp.net/attachments/1278690623121133581/1279488906043195505/Screenshot_2024-08-31_224046.png?ex=66d4a066&is=66d34ee6&hm=97b4110e48d10a08de3e1024453b2ef62d26d83db8fe03628936f4ba2cc79ac3&=&format=webp&quality=lossless&width=1440&height=655)

## Project Overview

YourHR allows users to:
- **Sign Up**: Create an account with personal information.
- **Upload Resume**: Submit their resume for job applications.
- **Authentication**: Securely log in and manage their profiles.

## Features
- **User Authentication**: Sign up and login functionalities with secure authentication.
- **Responsive Design**: Mobile-friendly interface ensuring usability on various devices.
- **File Upload**: Ability to upload resumes with progress indicators.
- **Error Handling**: Detailed error messages for better user experience.

## Technologies Used
- **Frontend**:
  - React
  - Tailwind CSS
  - Axios

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication

## Deployment
The application is hosted on [Vercel](https://your-hr-three.vercel.app). 

## Usage
- **Sign Up**: Navigate to the signup page and fill out the form with your personal details.
- **Login**: Use the login page to access your account.
- **Submit Resume**: Upload your resume through the provided form.

## Sample Database
``` json
{
  "_id":{"$oid":"66d29dffe31c16af13a41232"},
  "name":"Atharva Sardal",
  "email":"atharvasardal06@gmail.com",
  "password":"$2a$12$8mQefiGjBKDju/0QZMONm.Jt7drzBn8rNTQ/i/XJFq620AF0JxXM6",
  "bio":"I am product",
  "createdAt":{"$date":{"$numberLong":"1725079039680"}},
  "__v":{"$numberInt":"0"},
  "resume":{"$binary":{"base64":"JVBERi0xLjUNJeLjz9MNCjM1IDAgb2JqDTw8L0xpbmVhcml6ZWQgMS9MIDYyMzM4L08gM...","subType":"00"}},
  "resumeContentType":"application/pdf"
}
```

