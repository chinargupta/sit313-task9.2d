import React, { useState } from 'react';
import { storage } from './firebase'; // Import the storage from your Firebase configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import './image.css';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';

function Image() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImage = async () => {
        if (imageUpload === null) return;

        const uniqueFileName = `${uuidv4()}_${imageUpload.name}`;
        const imageRef = ref(storage, `images/${uniqueFileName}`);

        try {
            await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(imageRef);

            setImageUrl(url);

            // Save the image URL to Firebase Realtime Database
            const db = getDatabase(); // Initialize Realtime Database
            const imageUrlRef = databaseRef(db, 'imageUrls'); // Change 'imageUrls' to your desired path in the database
            push(imageUrlRef, url); // Push the URL to the database

            alert("Image Uploaded!");
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (
        <div className="img">
            <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
            <button onClick={uploadImage}>Upload image</button>
            {imageUrl && (
                <div>
                    <p>Image URL:</p>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
                </div>
            )}
        </div>
    )
}

export default Image;
