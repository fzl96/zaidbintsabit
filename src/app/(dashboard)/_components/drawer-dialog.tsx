"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DrawerDialogProps {
  trigger: "export" | "add" | "edit" | "delete" | React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function DrawerDialog({
  trigger,
  title,
  description,
  children,
  open,
  setOpen,
}: DrawerDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {typeof trigger === "string" ? (
            <Button
              variant={trigger === "add" ? "default" : "outline"}
              size={
                trigger === "add" || trigger === "export" ? "default" : "icon"
              }
            >
              {trigger === "export" ? (
                "Export"
              ) : trigger === "add" ? (
                "Tambah"
              ) : trigger === "edit" ? (
                <Icons.pen className="h-4 w-4" />
              ) : (
                <Icons.trash2 className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <>{children}</>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer shouldScaleBackground={true} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {typeof trigger === "string" ? (
          <Button
            variant={trigger === "add" ? "default" : "outline"}
            size={
              trigger === "add" || trigger === "export" ? "default" : "icon"
            }
          >
            {trigger === "export" ? (
              "Export"
            ) : trigger === "add" ? (
              "Tambah"
            ) : trigger === "edit" ? (
              <Icons.pen className="h-4 w-4" />
            ) : (
              <Icons.trash2 className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <>{children}</>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
