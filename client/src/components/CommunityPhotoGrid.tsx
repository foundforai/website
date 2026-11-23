import type { CommunityPhoto } from '@/data/community';

/**
 * Renders approved community photos with intrinsic dimensions.
 * Returns nothing when the list is empty.
 */
export default function CommunityPhotoGrid({ photos }: { photos: CommunityPhoto[] }) {
  if (photos.length === 0) return null;

  const ordered = [...photos].sort((a, b) => a.order - b.order);

  return (
    <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2">
      {ordered.map((photo) => (
        <li key={photo.src} className="min-w-0">
          <figure>
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-lg border bg-muted"
            />
            {photo.caption ? (
              <figcaption className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {photo.caption}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
