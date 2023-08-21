import { useState } from 'react';

export default function VideoUpload() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (e) => {
    setSelectedVideo(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
    </div>
  );
}
