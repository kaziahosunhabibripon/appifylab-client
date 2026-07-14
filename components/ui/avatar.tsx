import { cn, initials } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  firstName?: string;
  lastName?: string;
  className?: string;
};

export function Avatar({ src, firstName, lastName, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary",
        className,
      )}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        initials(firstName, lastName)
      )}
    </div>
  );
}
