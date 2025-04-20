import React from 'react';
import { Image, AnnotationResult } from '../types';

interface RankingSectionProps {
  selectedImages: Image[];
  annotations: AnnotationResult[];
  onRankChange: (imageId: string, rank: number | null) => void;
}

const RankingSection: React.FC<RankingSectionProps> = ({ 
  selectedImages, 
  annotations, 
  onRankChange 
}) => {
  if (selectedImages.length === 0) {
    return null;
  }

  return (
    <div className="ranking-section">
      <h2>Rank Selected Images (Optional)</h2>
      <p>You can assign ranks to selected images (lower numbers = higher relevance)</p>
      
      <div>
        {selectedImages.map((image) => {
          const annotation = annotations.find(a => a.imageId === image.id);
          const currentRank = annotation?.rank || '';
          
          return (
            <div key={image.id} className="ranking-item">
              <div className="ranking-item-image">
                <img src={image.url} alt={`Thumbnail ${image.id}`} />
              </div>
              <div className="ranking-item-controls">
                <label htmlFor={`rank-${image.id}`}>Rank:</label>
                <input
                  id={`rank-${image.id}`}
                  type="number"
                  min="1"
                  value={currentRank}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numberValue = value === '' ? null : parseInt(value, 10);
                    onRankChange(image.id, numberValue);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingSection; 