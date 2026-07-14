import Image from "next/image";
import { Plus } from "lucide-react";

const stories = [
  { name: "Your Story", image: "/assets/images/card_ppl1.png", owned: true },
  { name: "Ryan Roslansky", image: "/assets/images/card_ppl2.png" },
  { name: "Karim Saif", image: "/assets/images/card_ppl3.png" },
  { name: "Dylan Field", image: "/assets/images/card_ppl4.png" },
];

export function StoryRail() {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stories.map((story) => (
        <div key={story.name} className="relative h-40 overflow-hidden rounded-md bg-card">
          <Image src={story.image} alt="" fill className="object-cover" sizes="180px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            {story.owned ? (
              <span className="mb-2 grid size-8 place-items-center rounded-full bg-primary text-white">
                <Plus className="size-4" />
              </span>
            ) : null}
            <p className="truncate text-sm font-medium text-white">{story.name}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
