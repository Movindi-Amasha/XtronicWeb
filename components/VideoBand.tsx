// Full-width YouTube video that autoplays (muted, looping) as soon as the
// page loads. Browsers only allow autoplay with the sound off, so it starts
// muted; viewers can unmute with the player's own controls. Uses
// youtube-nocookie.com (no tracking cookies until played); allowed in the
// Content-Security-Policy frame-src in next.config.ts.

export default function VideoBand({ videoId, title }: { videoId: string; title: string }) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId, // required for loop to work on a single video
    controls: "1",
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
  });
  return (
    <section aria-label={title} className="relative mt-12 w-full px-2.5 sm:px-4 md:px-5">
      {/* small gap from the screen edges + a white frame on all four sides */}
      <div className="overflow-hidden rounded-[18px] border-4 border-white bg-white shadow-[0_18px_40px_-18px_rgba(13,31,53,0.45)] md:rounded-[26px] md:border-[6px]">
      {/* inner box keeps the video exactly 16:9 so YouTube adds no black bars */}
      <div className="relative aspect-video w-full overflow-hidden rounded-[14px] md:rounded-[20px]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      </div>
    </section>
  );
}
