// public/elements/ThreadNameUpdater.jsx
// Custom element that updates thread name via PUT request to /project/thread

import { useEffect } from 'react';

export default function ThreadNameUpdater({ userInput }) {
  useEffect(() => {
    const updateThreadName = async () => {
      try {
        // Extract thread ID from current URL
        const currentUrl = window.location.href;
        const threadIdMatch = currentUrl.match(/\/thread\/([a-f0-9-]+)/);
        
        if (!threadIdMatch) {
          console.warn('Thread ID not found in URL:', currentUrl);
          return;
        }
        
        const threadId = threadIdMatch[1];
        console.log('Extracted thread ID:', threadId);
        console.log('User input for thread name:', userInput);
        
        // Truncate userInput to a reasonable length for thread name (max 100 chars)
        const threadName = userInput.length > 100 
          ? userInput.substring(0, 97) + '...' 
          : userInput;
        
        // Send PUT request to update thread name
        const response = await fetch('/project/thread', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            threadId: threadId,
            name: threadName
          })
        });
        
        if (response.ok) {
          console.log('Thread name updated successfully to:', threadName);
        } else {
          const errorText = await response.text();
          console.warn('Failed to update thread name:', response.status, response.statusText, errorText);
        }
        
      } catch (error) {
        console.error('Error updating thread name:', error);
      }
    };
    
    // Only update if userInput is provided and is not empty
    if (userInput && userInput.trim()) {
      // Add a small delay to ensure the page is fully loaded
      setTimeout(updateThreadName, 500);
    }
    
  }, [userInput]);
  
  return null; // This component doesn't render anything visible
}