import Navigation from '../components/pages/Navigation';
import VideoFeed from '@/components/pages/VideoFeed';

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <Navigation />

      <div className="md:ml-24">
        <VideoFeed />
      </div>
    </main>
  );
}
