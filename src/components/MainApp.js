import '../App.css';
import { useState } from 'react';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

/**
 * MainApp Component
 * Core application component that handles note taking and media attachment functionality
 */
function MainApp() {
  // === STATE MANAGEMENT ===
  const [note, setNote] = useState('');
  const [mediaFile, setMediaFile] = useState(null);

  // === EVENT HANDLERS ===
  /**
   * Handles changes to the note input field
   * Logs the note content for debugging (truncated if > 50 chars)
   */
  const handleNoteChange = (e) => {
    setNote(e.target.value);
    console.log('Note content updated:', e.target.value.length > 50 ? 
      `${e.target.value.substring(0, 50)}...` : e.target.value);
  };

  /**
   * Handles file attachment functionality
   * Processes and validates uploaded media files
   */
  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);
      console.log('Media file attached:', {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('Media file attachment cancelled');
    }
  };

  /**
   * Handles form submission for notes and media
   * Logs submission details including note length and media information
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Note submission initiated:', {
      noteLength: note.length,
      hasMedia: !!mediaFile,
      timestamp: new Date().toISOString(),
      preview: note.substring(0, 50) + (note.length > 50 ? '...' : '')
    });
    // Handle the submission of note and media
    console.log('Submit button clicked!');
    console.log('Form submission details:');
    console.log('- Note content length:', note.length);
    console.log('- Note preview:', note.length > 50 ? `${note.substring(0, 50)}...` : note);
    console.log('- Media attached:', mediaFile ? 'Yes' : 'No');
    if (mediaFile) {
      console.log('- Media file:', {
        name: mediaFile.name,
        type: mediaFile.type,
        size: `${(mediaFile.size / 1024).toFixed(2)} KB`
      });
    }
  };

  // === COMPONENT RENDER ===
  return (
    <div className="App">
      {/* Main Content Area */}
      <div className="app-content">
        <h1 className="app-title">note-tortious</h1>
        {/* Future content area placeholder */}
      </div>

      {/* Message Input Bar */}
      <div className="chat-bar-container">
        <form onSubmit={handleSubmit} className="chat-bar">
          <div className="input-group">
            <textarea
              value={note}
              onChange={handleNoteChange}
              placeholder="Message..."
              className="message-input"
              rows="1"
              onFocus={() => console.log('Note textarea focused')}
            />
            {/* Action Buttons */}
            <div className="button-group">
              <label className="attach-button">
                <input
                  type="file"
                  onChange={handleMediaChange}
                  accept="image/*,video/*,audio/*"
                  className="file-input"
                />
                <FaPaperclip className="attach-icon" />
              </label>
              <button type="submit" className="send-button">
                <FaPaperPlane className="send-icon" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainApp;