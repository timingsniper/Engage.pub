type PageViewProps = {
  children: React.ReactNode;
  paddingBottom?: number;
  isLoading?: boolean;
};

export default function PageView({ children }: PageViewProps) {
  return <div className="min-h-[90vh]">{children}</div>;
}
