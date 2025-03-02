import '../App.css';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

function MainApp() {
  const [note, setNote] = useState('');
  const [mediaFile, setMediaFile] = useState(null);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    console.log('Note content updated:', e.target.value.length > 50 ? 
      `${e.target.value.substring(0, 50)}...` : e.target.value);
  };

  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
      console.log('Media file selected:', e.target.files[0].name);
      console.log('File details:', {
        type: e.target.files[0].type,
        size: `${(e.target.files[0].size / 1024).toFixed(2)} KB`,
        lastModified: new Date(e.target.files[0].lastModified).toLocaleString()
      });
    } else {
      console.log('No media file selected or file selection canceled');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">note-tortious</h1>
        <div className="note-card">
          <form onSubmit={handleSubmit}>
            <textarea
              value={note}
              onChange={handleNoteChange}
              placeholder="Write your note here I will check canvas..."
              className="note-textarea"
              onFocus={() => console.log('Note textarea focused')}
            />
            <div className="form-footer">
              <label 
                className="custom-file-upload"
                onClick={() => console.log('Attach media button clicked')}
              >
                <input
                  type="file"
                  onChange={handleMediaChange}
                  accept="image/*,video/*,audio/*"
                  className="file-input"
                />
                <span>Attach Media</span>
              </label>
              <button 
                type="submit" 
                className="submit-button"
                onClick={() => console.log('Send button clicked - submitting note')}
              >
                <FaPaperPlane className="paper-plane-icon" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default MainApp;