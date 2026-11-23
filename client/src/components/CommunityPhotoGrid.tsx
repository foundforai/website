import type { CommunityPhoto } from '@/data/community';

/**
 * Renders approved community photos with intrinsic dimensions.
 * Returns nothing when the list is empty.
 */
export default function CommunityPhotoGrid({
  photos,
  eager = false,
}: {
  photos: CommunityPhoto[];
  /** Load immediately. The June workshop photos use this so a portrait frame is not an empty box before scroll. */
  eager?: boolean;
}) {
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
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              className="block h-auto w-full rounded-lg border"
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
