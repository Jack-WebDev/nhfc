export function Item(props: ItemProps) {
    const { label, value, element, secondValue } = props;
    return (
      <div className="flex  items-center justify-between gap-3">
        <p className="text-sm font-normal text-gray-500">{label}:</p>
  
        {element ? (
          element
        ) : secondValue ? (
          <div className="flex items-center gap-4">
            <p className="text-xs font-semibold">{value}</p>
            <p className="text-sm font-semibold">{secondValue}</p>
          </div>
        ) : (
          <p className="text-xs font-semibold">{value}</p>
        )}
      </div>
    );
  }
  
  type ItemProps = {
    label: string;
    value?: string | number | null | undefined;
    secondValue?: number | string | null | undefined;
    element?: React.ReactNode;
  };