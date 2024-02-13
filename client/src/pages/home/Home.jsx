import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await axios.get('http://localhost:8800/api/images');
            setImages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const onChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post('http://localhost:8800/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            console.log(res.data);
            fetchImages();
            alert('Image uploaded successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/api/auth/logout")
            localStorage.setItem("token", null)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onChange} />
                <button type="submit">Upload</button>
            </form>
            <h2>Uploaded Images</h2>
            <div className="images-container">
                {images.map((image, index) => (
                    <img key={index} src={`/${image.filePath}`} alt={`Image ${index}`} />
                ))}
            </div>
            <button onClick={handleLogout} >logout</button>
        </div>
    );
};


export default Home