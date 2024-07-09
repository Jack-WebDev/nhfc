export function DataItem(props: ItemProps) {
    const { label, value, element } = props;
    return (
      <div className="flex  items-center justify-between gap-3">
        <p className="text-md font-normal text-gray-500">{label}:</p>
        {element ? element : <p className="text-sm font-semibold">{value}</p>}
      </div>
    );
  }
  
  type ItemProps = {
    label: string;
    value?: string | number | null | undefined;
    element?: React.ReactNode;
    
  };