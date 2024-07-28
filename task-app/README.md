# File Uploading with Express, Image Processing with Sharp, and Sending Emails

This project demonstrates how to create a simple file uploading feature using Express.js, filter and process uploaded images using `sharp`, and send emails using Node.js.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [File Uploading](#file-uploading)
- [Sending Emails](#sending-emails)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## File Uploading

This project uses `multer` to handle file uploads and `sharp` to process images.

### Setup

1. Install `multer` and `sharp`:
    ```bash
    npm install multer sharp
    ```
2. Create an instance of `multer` and specify the destination for uploaded files:

    ```javascript
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' });
    ```

3. Create a route to handle file uploads and process images with `sharp`:

    ```javascript
    const sharp = require('sharp');
    const fs = require('fs');
    const path = require('path');

    app.post('/upload', upload.single('file'), (req, res) => {
        const filePath = req.file.path;
        const outputPath = path.join('uploads', `processed-${req.file.originalname}`);

        sharp(filePath)
            .resize(300, 300) // Resize to 300x300 pixels
            .toFile(outputPath, (err, info) => {
                if (err) {
                    return res.status(500).send(err.toString());
                }

                // Optionally, delete the original file
                fs.unlink(filePath, (err) => {
                    if (err) {
                        return res.status(500).send(err.toString());
                    }
                    res.send('File uploaded and processed successfully!');
                });
            });
    });
    ```

### Example

Here's a basic example of an HTML form to upload a file:

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <button type="submit">Upload</button>
</form>
