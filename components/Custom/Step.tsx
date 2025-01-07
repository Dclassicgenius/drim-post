interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="mt-10 space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
          {number}
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <div className="ml-14">{children}</div>
    </div>
  );
}
