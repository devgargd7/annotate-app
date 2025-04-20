import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Image, AnnotationResult, SavedResult } from '../types';
import { candidateImages, queryImages } from '../mockData';
import ImageGrid from './ImageGrid';
import RankingSection from './RankingSection';
import { saveAnnotationResults, saveAllResults } from '../utils';

// Available options for dropdowns
const USER_OPTIONS = ['dev', 'divij', 'parth'];
const TASK_OPTIONS = ['similar item', 'goes with it', 'boolean query'];

const AnnotationTool: React.FC = () => {
  // User info
  const [userName, setUserName] = useState('');
  const [taskName, setTaskName] = useState('');

  // Current state
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());
  const [annotations, setAnnotations] = useState<AnnotationResult[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  // const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Accumulated results
  const [allResults, setAllResults] = useState<SavedResult[]>([]);

  // Refs
  const queryImageRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize with mock data
  useEffect(() => {
    setImages(candidateImages);

    // Initialize annotations for all images
    const initialAnnotations = candidateImages.map(image => ({
      imageId: image.id,
      relevant: false,
      rank: null
    }));

    setAnnotations(initialAnnotations);

    // Add scroll event listener
    const handleScroll = () => {
      if (queryImageRef.current) {
        const stickyTriggerPosition = queryImageRef.current.offsetTop + queryImageRef.current.offsetHeight;
        const isScrolledPastQuery = window.scrollY > stickyTriggerPosition;

        setIsSticky(isScrolledPastQuery);
        // setShowScrollToBottom(isScrolledPastQuery);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (queryImageRef.current) {
      queryImageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Current query image
  const currentQueryImage = queryImages(userName, taskName)[currentQueryIndex];

  // Get only selected images as objects
  const selectedImages = images.filter(img => selectedImageIds.has(img.id));

  // Toggle image selection
  const toggleImageSelection = (imageId: string) => {
    const newSelectedIds = new Set(selectedImageIds);
    
    if (newSelectedIds.has(imageId)) {
      newSelectedIds.delete(imageId);
      
      // Update annotation to mark as not relevant
      setAnnotations(prev => {
        const newAnnotations = prev.map(a => 
          a.imageId === imageId 
            ? { ...a, relevant: false, rank: null } 
            : a
        );
        return newAnnotations;
      });
    } else {
      newSelectedIds.add(imageId);
      
      // Update annotation to mark as relevant
      setAnnotations(prev => {
        const newAnnotations = prev.map(a => 
          a.imageId === imageId 
            ? { ...a, relevant: true } 
            : a
        );
        return newAnnotations;
      });
    }
    
    setSelectedImageIds(newSelectedIds);
  };

  // Update rank for a selected image
  const handleRankChange = (imageId: string, rank: number | null) => {
    setAnnotations(prev =>
      prev.map(a =>
        a.imageId === imageId
          ? { ...a, rank }
          : a
      )
    );
  };

  // Handle next query without saving
  const handleNext = () => {
    if (currentQueryIndex < queryImages(userName, taskName).length - 1) {
      moveToNextQuery();
    } else {
      alert('This is the last query image.');
    }
  };

  // Skip current query
  const handleSkip = () => {
    if (currentQueryIndex < queryImages(userName, taskName).length - 1) {
      moveToNextQuery();
    }
  };

  // Helper function to move to next query
  const moveToNextQuery = () => {
    // Move to next query
    setCurrentQueryIndex(prev => prev + 1);

    // Reset selections
    setSelectedImageIds(new Set());

    // Reset annotations
    const resetAnnotations = images.map(image => ({
      imageId: image.id,
      relevant: false,
      rank: null
    }));

    setAnnotations(resetAnnotations);
  };

  // Add current results to accumulated results
  const addCurrentResults = () => {
    if (!userName || !taskName) {
      alert('Please select both User Name and Task Name');
      return false;
    }

    // Create new result object
    const newResult: SavedResult = {
      userName,
      taskName,
      queryImageId: currentQueryImage.id,
      timestamp: new Date().toISOString(),
      annotations
    };
    
    // Add to accumulated results
    setAllResults(prev => [...prev, newResult]);
    
    return true;
  };

  // Save results
  const handleSave = () => {
    if (!userName || !taskName) {
      alert('Please select both User Name and Task Name');
      return;
    }
    
    // Check if any images are marked as relevant
    const hasRelevantImages = annotations.some(a => a.relevant);
    
    if (!hasRelevantImages) {
      alert('Please select at least one relevant image before saving.');
      return;
    }
    
    // Create new result object for current state
    const newResult: SavedResult = {
      userName,
      taskName,
      queryImageId: currentQueryImage.id,
      timestamp: new Date().toISOString(),
      annotations
    };
    
    
    // Create array with all results including current
    const resultsToSave = [...allResults, newResult];
    
    if (resultsToSave.length === 0) {
      alert('No results to save. Please select at least one relevant image.');
      return;
    }
    
    // Save all results
    saveAllResults(userName, taskName, resultsToSave);
    
    // Reset accumulated results after saving
    setAllResults([]);
    
    // Move to next query if available
    if (currentQueryIndex < queryImages(userName, taskName).length - 1) {
      moveToNextQuery();
    } else {
      // Reset everything if we're on the last query
      setCurrentQueryIndex(0);
      setSelectedImageIds(new Set());
      const resetAnnotations = images.map(image => ({
        imageId: image.id,
        relevant: false,
        rank: null
      }));
      setAnnotations(resetAnnotations);
      
      alert('All queries completed! Starting over.');
    }
  };

  return (
    <div className="annotation-tool">
      {/* User info section */}
      <div className="user-info">
        <div className="dropdown-container">
          <label htmlFor="user-select">User Name:</label>
          <select
            id="user-select"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="dropdown-select"
          >
            <option value="">Select User</option>
            {USER_OPTIONS.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          <label htmlFor="task-select">Task Name:</label>
          <select
            id="task-select"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="dropdown-select"
          >
            <option value="">Select Task</option>
            {TASK_OPTIONS.map(task => (
              <option key={task} value={task}>{task}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sticky query image section */}
      {isSticky && (
        <div className="query-image-sticky">
          <div className="sticky-content">
            <h3>Query {currentQueryIndex + 1}/{queryImages(userName, taskName).length}</h3>
            <img
              src={currentQueryImage.url}
              alt="Query"
            />

          </div>
        </div>
      )}

      {/* {showScrollToBottom && ( */}
        <button className="scroll-to-bottom" onClick={scrollToBottom}>
          ↓ Go to Bottom
        </button>
      {/* )} */}

      {/* Query image section */}
      <div className="query-image" ref={queryImageRef}>
        <h2>Query Image</h2>
        <h3>{currentQueryIndex + 1}/{queryImages(userName, taskName).length}</h3>
        <p>Select images that are relevant to this query image</p>
        <img
          src={currentQueryImage.url}
          alt="Query"
          style={{ maxHeight: '200px', marginBottom: '20px' }}
        />
      </div>

      {/* Results count */}
      {allResults.length > 0 && (
        <div className="results-count">
          <p>Unsaved results: {allResults.length}</p>
        </div>
      )}

      {/* Image grid */}
      <h2>Select Relevant Images</h2>
      <ImageGrid
        images={images}
        selectedImages={selectedImageIds}
        toggleImageSelection={toggleImageSelection}
      />

      {/* Ranking section */}
      <RankingSection
        selectedImages={selectedImages}
        annotations={annotations}
        onRankChange={handleRankChange}
      />

      {/* Controls */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑ Go to Top
      </button>
      
      <div className="buttons">
        <button className="skip" onClick={handleSkip}>Skip</button>
        <button className="next" onClick={handleNext}>Next</button>
        <button onClick={handleSave}>Save All</button>
      </div>

      {/* Bottom reference element */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default AnnotationTool; 