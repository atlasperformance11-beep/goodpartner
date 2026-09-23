import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      visibleToasts={3}
      offset={{ bottom: "1.25rem", right: "1.25rem" }}
      mobileOffset={{ bottom: "5.75rem" }}
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-card text-foreground border-border shadow-[var(--shadow-float)] font-sans",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
