import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { BusinessIndustryId } from "@/data/business-industries";

type IconProps = {
  className?: string;
  title?: string;
};

function SvgShell({
  className,
  title,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconRestaurant(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M8 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
      <path d="M10 13v8" />
      <path d="M8 5h4" />
      <path d="M16 3v18" />
      <path d="M16 8h2.5a1.5 1.5 0 0 0 0-3H16" />
    </SvgShell>
  );
}

export function IconHotel(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
    </SvgShell>
  );
}

export function IconClinic(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </SvgShell>
  );
}

export function IconBeauty(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M8 4c0 2 1.5 3 1.5 5S8 12 8 14s1 4 4 4 4-2 4-4-1.5-3-1.5-5S16 6 16 4" />
      <path d="M10 20h4" />
    </SvgShell>
  );
}

export function IconRetail(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M4 8h16l-1.2 11.2A2 2 0 0 1 16.81 21H7.19a2 2 0 0 1-1.99-1.8L4 8Z" />
      <path d="M8 8a4 4 0 0 1 8 0" />
    </SvgShell>
  );
}

export function IconConstruction(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M3 21h18" />
      <path d="M6 21V10l6-5 6 5v11" />
      <path d="M10 21v-5h4v5" />
      <path d="M2 10h20" />
    </SvgShell>
  );
}

export function IconTourism(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M3 12h18" />
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
      <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9" />
      <path d="M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9" />
    </SvgShell>
  );
}

export function IconRealEstate(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M10 20v-5h4v5" />
    </SvgShell>
  );
}

export function IconEducation(props: IconProps) {
  return (
    <SvgShell {...props}>
      <path d="M2 9l10-5 10 5-10 5L2 9Z" />
      <path d="M6 11.5v4.5c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
      <path d="M22 9v6" />
    </SvgShell>
  );
}

export function IconProfessional(props: IconProps) {
  return (
    <SvgShell {...props}>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
    </SvgShell>
  );
}

const iconMap: Record<
  BusinessIndustryId,
  (props: IconProps) => ReactElement
> = {
  restaurant: IconRestaurant,
  hotel: IconHotel,
  clinic: IconClinic,
  beauty: IconBeauty,
  retail: IconRetail,
  construction: IconConstruction,
  tourism: IconTourism,
  "real-estate": IconRealEstate,
  education: IconEducation,
  professional: IconProfessional,
};

export function IndustryIcon({
  id,
  className,
}: {
  id: BusinessIndustryId;
  className?: string;
}) {
  const Icon = iconMap[id];
  return <Icon className={className} />;
}
