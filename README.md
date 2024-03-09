# Xendpal - Static File Database

## Introduction

Welcome to the Xendpal frontend repository. Xendpal is a pioneering platform designed to revolutionize how developers and designers alike manage, host, and embed static files such as images, videos alike into their projects. Built with the power of React and TypeScript, Xendpal offers a seamless, high-performance experience, enabling effortless management of static content.

## Why Xendpal?

> **As a web developer, grappling with the constraints of existing cloud storage solutions was a routine struggle for me.** The tipping point came during a website design project for a client. I needed a straightforward method to attach URLs for static files in image tags etc. Solutions like Dropbox didn't fit the bill as their file links are not designed for direct embedding in HTML. Uploading large images to GitHub also wasn’t viable due to file size restrictions and the lack of a subscription for hosting static files — it was a roadblock that seemed insurmountable. This is where Xendpal comes into the picture — a platform born out of necessity and frustration, crafted to bypass these very limitations. Xendpal isn’t just another cloud storage option; it’s a specialized solution for developers and designers alike who need a practical and efficient way to manage and embed static files directly in their projects.

### Motivation

The motivation behind Xendpal is to fill the gap left by existing platforms by offering features specifically designed for web development needs, such as:

- **High-Speed Concurrent Uploads**: Leveraging the latest web technologies to allow for the uploading of multiple files at once, dramatically reducing the time needed to manage static resources.
- **Advanced File Chunking**: Implementing smart chunking algorithms to handle large files more efficiently, ensuring smooth uploads and quick access.
- **Dedicated Folder Structures**: Providing web developers with the ability to create custom folder structures, making it easier to organize and retrieve files in a way that mirrors their project's architecture.

## Differentiation

What sets Xendpal apart from platforms like Dropbox is its focus on the needs of developers and designers. Every feature, from file chunking and concurrent uploads to our intuitive folder creation system, is designed with the goal of simplifying the development process. Our platform isn't just about storage – it's about enhancing the workflow of web development projects by making static file management as easy and efficient as possible.

## Conquer Daunting Scenarios with Xendpal

Beyond streamlining everyday static file management, Xendpal empowers you to tackle even the most challenging web development situations:

### Scenario 1: Streamlining Large-Scale Website Redesigns

Managing hundreds of images, videos, and other assets for a website redesign can be overwhelming with traditional cloud storage.

**Xendpal's Solution:** Create dedicated folder structures that mimic your website's architecture (e.g., "images/home", "videos/about-us") for intuitive organization. Utilize high-speed concurrent uploads to efficiently handle the influx of files.

### Scenario 2: Seamless Collaboration with Remote Teams

Working with geographically dispersed teams on tight deadlines necessitates efficient and secure asset sharing.

**Xendpal's Solution:** Share direct links to static assets, ensuring everyone has access to the latest versions, eliminating version control headaches and broken links.

### Scenario 3: Maintaining Consistency Across Environments

Maintaining consistent static assets (logos, icons) across development, staging, and production environments can be time-consuming.

**Xendpal's Solution:** Upload assets to Xendpal once. Reference them using links within your application code, guaranteeing consistency across environments without code modifications.

### Scenario 4: Facilitating Frequent Client Revisions

Client revisions often involve frequent changes to design elements (images, logos). Manually updating files on cloud storage can be tedious.

**Xendpal's Solution:** Simply upload the revised file, and the link automatically updates, reflecting the changes throughout your website or application. No need to modify code that references the asset.

### Scenario 5: Overcoming Limited Hosting Storage

Limited storage space on your web hosting plan can restrict the number of static assets you can store. Upgrading might not be feasible.

**Xendpal's Solution:** Offload storage burdens from your hosting provider by using Xendpal to host images, videos, and other assets. Reference them using direct links, potentially freeing up valuable storage space on your hosting plan.

## Getting Started

### Prerequisites

Before setting up Xendpal locally, ensure you have the following installed on your machine:

- Node.js (Preferably the latest LTS version)
- npm (Comes installed with Node.js)

These tools are essential for running JavaScript projects, including Xendpal.

### Installation

Follow these steps to get Xendpal up and running on your local machine:

1. **Clone the Repository**

   First, clone the Xendpal frontend repository to your local machine using Git:

   ```bash
   git clone https://github.com/joeygoesgrey/Xendpal-client-side.git
   ```

2. **Navigate to the Directory**

   Change into the directory of the cloned repository:

   ```bash
   cd Xendpal-client-side
   ```

3. **Install Dependencies**

   Install the project dependencies with npm. These dependencies include React, TypeScript, and other libraries that Xendpal uses:

   ```bash
   npm install
   ```

4. **Launch the Application**

   Finally, start the application using npm:

   ```bash
   npm start
   ```

   After executing this command, the application should be running on `http://localhost:3000`, and you can start exploring Xendpal's features.

Explore !
