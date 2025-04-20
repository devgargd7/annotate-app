import React from 'react';
import { Image } from '../types';

interface ImageGridProps {
  images: Image[];
  selectedImages: Set<string>;
  toggleImageSelection: (imageId: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ 
  images, 
  selectedImages, 
  toggleImageSelection 
}) => {
  return (
    <div className="image-grid">
      {images.length > 0 ? (
        images.map((image) => (
          <div 
            key={image.id}
            className={`image-item ${selectedImages.has(image.id) ? 'selected' : ''}`}
            onClick={() => toggleImageSelection(image.id)}
          >
            <img src={image.url} alt={`Image ${image.id}`} />
          </div>
        ))
      ) : (
        <div className="no-images">No images available</div>
      )}
    </div>
  );
};

export default ImageGrid; 