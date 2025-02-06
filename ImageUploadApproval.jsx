import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ImageUploadApproval = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [approvedImages, setApprovedImages] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const approveImage = () => {
    if (selectedImage) {
      setApprovedImages([...approvedImages, selectedImage]);
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Image Upload & Approval
      </h1>
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded-lg"
        />
        {selectedImage && (
          <div className="mt-4 text-center">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={approveImage}
              className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
            >
              Approve
            </button>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8">
        Approved Images
      </h2>
      <PhotoProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {approvedImages.map((image, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg text-center"
            >
              <PhotoView src={image}>
                <img
                  src={image}
                  alt={`Approved ${index}`}
                  className="max-w-full mx-auto rounded-lg cursor-pointer"
                />
              </PhotoView>
              <a
                href={image}
                download={`approved_image_${index}.jpg`}
                className="block bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default ImageUploadApproval;
