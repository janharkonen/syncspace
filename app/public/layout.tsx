"use client";

export default function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-full">
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}
