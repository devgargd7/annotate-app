import { AnnotationResult, SavedResult } from './types';

export const saveAnnotationResults = (
  userName: string,
  taskName: string,
  queryImageId: string,
  annotations: AnnotationResult[]
): void => {
  // Get existing results or initialize empty array
  const existingResultsStr = localStorage.getItem('annotationResults');
  const existingResults: SavedResult[] = existingResultsStr ? JSON.parse(existingResultsStr) : [];

  // Create new result object
  const newResult: SavedResult = {
    userName,
    taskName,
    queryImageId,
    timestamp: new Date().toISOString(),
    annotations
  };

  // Add new result to existing results
  existingResults.push(newResult);

  // Save back to localStorage
  localStorage.setItem('annotationResults', JSON.stringify(existingResults));

  // Log to console (in a real app, this might be sent to a server)
  console.log('Saved annotation results:', newResult);

  // Create and download a JSON file
  const fileName = `${userName.replace(/\s+/g, '_')}_${taskName.replace(/\s+/g, '_')}_${new Date().getTime()}.json`;
  const dataStr = JSON.stringify(newResult, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = fileName;
  link.click();
};

// Function to save all accumulated results into a single JSON file
export const saveAllResults = (
  userName: string,
  taskName: string,
  results: SavedResult[]
): void => {
  if (results.length === 0) {
    console.warn('No results to save');
    alert('No results to save');
    return;
  }

  // Filter out results with no relevant images
  const resultsWithRelevantImages = results.filter(result => 
    result.annotations.some(annotation => annotation.relevant)
  );

  if (resultsWithRelevantImages.length === 0) {
    console.warn('No relevant images in results');
    alert('No relevant images selected. Please select at least one image as relevant before saving.');
    return;
  }

  // Save to localStorage
  localStorage.setItem('allAnnotationResults', JSON.stringify(resultsWithRelevantImages));
  
  // Log to console
  console.log('Saved all annotation results:', resultsWithRelevantImages);

  // Create and download a JSON file with all results
  const fileName = `${userName.replace(/\s+/g, '_')}_${taskName.replace(/\s+/g, '_')}_all_${new Date().getTime()}.json`;
  const dataStr = JSON.stringify(resultsWithRelevantImages, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = fileName;
  link.click();
  
  alert('Results saved successfully!');
}; 