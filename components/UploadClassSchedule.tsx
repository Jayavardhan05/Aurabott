import { useState } from 'react';

export default function UploadClassSchedule() {
  const [className, setClassName] = useState('');
  const [schedule, setSchedule] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/admin/class-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-secret-token',
        },
        body: JSON.stringify({ className, schedule }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to upload class schedule.');
      } else {
        alert('Class schedule uploaded successfully!');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Class Name</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Schedule</label>
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Upload</button>
    </form>
  );
}
