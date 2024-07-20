import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbComponent({
  items,
}: {
  items: { title: string; href: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx) => (
          <>
            <BreadcrumbItem key={item.href}>
              <BreadcrumbLink
                href={item.href}
                className="text-lg font-medium hover:text-primary"
              >
                {item.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {idx < items.length - 1 && (
              <BreadcrumbSeparator
                key={`sep-${item.href}`}
                className="text-lg font-medium"
              >
                /
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
